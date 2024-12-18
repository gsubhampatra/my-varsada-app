import { GColors } from "@/src/constants/GStyles";
import api from "@/src/http/axiosconfig";
import { API_ROUTES } from "@/src/kv";
import { useQuery } from "@tanstack/react-query";
import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";

interface Slide {
  image: string;
  heading: string;
  top_text: string;
  bottom_text: string;
  position: string;
  button_text: string;
  link: string;
}



interface BannerData {
  status: boolean;
  banners: {
    banner_name: string;
    top_text: string;
    bottom_text: string;
    button_text: string;
    mediaUrl: string;
    mediaType: string;
    link: string;
    position: string;
  }[];
}

async function fetchSlides(): Promise<BannerData> {
  const res = await api.get(API_ROUTES.BANNER.GET);
  if (!res.status) throw new Error("Failed to load banners");
  return res.data;
}
const slidesdata = [
  {
    image:
      "https://s3-alpha-sig.figma.com/img/4444/23be/5373a1afd3d6c2aab8ef38e8d562a983?Expires=1735516800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=LXGERJW7bnZ54BFv5g7oChqdpLlJg1kZAG2eZoq7AolV4zGN538M04QDxMD0SGwMfpEeMp06aqeN5VUqkiw5MyHxez~VXRx873Farb7PHGWvHiA2YdZmRYebF70gZlwrmTXF1Ftc4amRqS6DavOA4rDBY08kIMBrEvLS3AeYbWQrTz7ejdv3qp9gCTxp7~f3yPwk-fdN2u3PbWWVyRj-PZSojDsMkFWugFdo9MCQyjXY0fY8mnQ9qyl12J3cshtAODqGCH8ly-J6lt2KuUUzHx01ovluZcHMJkrfkDLkzGWCYI1wOHQMx-V1uUSNRnlS18im25sbmh3NYuJzZc1UhA__",
    heading: "Women's Collection",
    top_text: "Classic Exclusive",
    bottom_text: "Up to 40% off",
    button_text: "shop this",
    link: "#",
    position: "end",
  },
  {
    image:
      "https://www.apetogentleman.com/wp-content/uploads/2023/01/How-To-Create-An-Effective-Clothing-Brand-1.jpg",
    heading: "Men's Collection",
    top_text: "Modern & Stylish",
    bottom_text: "Up to 30% off",
    button_text: "explore now",
    link: "#",
    position: "start",
  },
  {
    image:
      "https://images.lifestyleasia.com/wp-content/uploads/sites/7/2023/03/10110134/clothing-brands-for-teens-2.jpg",
    heading: "Teen's Collection",
    top_text: "Trendy & Cool",
    bottom_text: "Up to 20% off",
    button_text: "discover now",
    link: "#",
    position: "center",
  },
];

const sortSlides = (slides: Slide[]) => {
  const sortedSlides = slides.sort((a, b) => {
    if (a.position === "start") {
      return -1;
    }
    if (a.position === "end") {
      return 1;
    }
    return 0;
  });

  return sortedSlides;
};

const { width } = Dimensions.get("window"); // Get screen width

const Carousel = () => {
  const interval = 5000;
  const [slides, setSlides] = useState<Slide[] | null>(null);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slideTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { isLoading, error, data } = useQuery<BannerData>({
    queryKey: ["slides"],
    queryFn: fetchSlides,
  });

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error loading slides</Text>
      </View>
    );
    
  }

  if (data?.banners) {
    const slidesData = data.banners.map((slide) => {
      return {
        image: slide.mediaUrl,
        heading: slide.banner_name,
        top_text: slide.top_text,
        bottom_text: slide.bottom_text,
        button_text: slide.button_text,
        link: slide.link,
        position: slide.position as "start" | "center" | "end",
      };
    });
    setSlides(sortSlides(slidesData));
  }
  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#C473FF" />
      </View>
    );
  }
  if (!slides) {
    return (
      <View style={styles.container}>
        <Text>No slides</Text>
      </View>
    );
  }

  const nextSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === slides.length - 1 ? 0 : prevSlide + 1
    );
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    slideTimeout.current = setTimeout(nextSlide, interval);

    return () => {
      if (slideTimeout.current) {
        clearTimeout(slideTimeout.current);
      }
    };
  }, [currentSlide, interval]);

  return (
    <View style={styles.container}>
      {slides.map((slide, index) => (
        <View
          key={index}
          style={[styles.slide, { opacity: index === currentSlide ? 1 : 0 }]}
        >
          <Image source={{ uri: slide.image }} style={styles.image} />
          <View style={styles.content}>
            <View style={[styles.textContainer, styles.textStart]}>
              <Text style={styles.topText}>{slide.top_text}</Text>
              <Text style={styles.heading}>{slide.heading}</Text>
              <Text style={styles.bottomText}>{slide.bottom_text}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => console.log(slide.link)}
              >
                <Text style={styles.buttonText}>{slide.button_text}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
      <View style={styles.dotContainer}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDotClick(index)}
            style={[
              styles.dot,
              index === currentSlide ? styles.activeDot : null,
            ]}
          ></TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 97,
  },
  slide: {
    position: "absolute",
    width: width,
    height: 194,
    overflow: "hidden",
    transitionProperty: "opacity",
    transitionDuration: "0.5s",
    transitionTimingFunction: "ease-in-out",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    opacity: 0.75,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  textStart: {
    alignItems: "flex-start",
  },
  textCenter: {
    alignItems: "center",
  },
  textEnd: {
    alignItems: "flex-end",
  },
  topText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  bottomText: {
    fontSize: 10,
    color: "white",
    marginBottom: 4,
  },
  button: {
    backgroundColor: "#C473FF",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
    marginTop: 4,
  },
  buttonText: {
    color: "white",
    fontSize: 10,
  },
  dotContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 5,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    marginHorizontal: 3,
  },
  activeDot: {
    backgroundColor: "white",
  },
  noSlides: {
    fontSize: 16,
    color: GColors.grey,
  },
});

export default Carousel;
