// const base: string = 'http://localhost:3000';

// export const createCategory: URL = new URL(`${base}/api/createcategory`);
// export const getCategory: URL = new URL(`${base}/api/getallcategory`);

const BASE_URL = `${process.env.EXPO_PUBLIC_API_URL}`;
// const BASE_URL = 'http://192.168.29.226:3000';

// Define the API routes in a structured way
export const API_ROUTES = {
  AUTH: {
    REQUEST_OTP: `${BASE_URL}/auth/request-otp`,
    VERIFY_OTP: `${BASE_URL}/auth/verify-otp`,
    ME: `${BASE_URL}/auth/me`,
    GOOGLE: `${BASE_URL}/auth/google`,
  },
  USER: {
    CREATE_DETAILS: `${BASE_URL}/user/createuserdetails`,
    GET_DETAILS: `${BASE_URL}/user/getuserdetails`,
    ADD_TO_BAG: `${BASE_URL}/user/addtovarsadabag`,
    GET_FROM_BAG: `${BASE_URL}/user/getvarsadabag`,
    REMOVE_FROM_BAG: `${BASE_URL}/user/removefromvarsadabag`,
    CHECK_BAG: `${BASE_URL}/user/isproductinvarsadabag`,
    GET_COINS: `${BASE_URL}/user/getmycoin`,
    ADD_TO_DREAM_LIST: `${BASE_URL}/user/addtodreamlist`,
    GET_DREAM_LIST: `${BASE_URL}/user/getmydreamlist`,
    REMOVE_FROM_DREAM_LIST: `${BASE_URL}/user/removefromdreamlist`,
    ADDRESS: {
      CREATE: `${BASE_URL}/user/createaddress`,
      GET: `${BASE_URL}/user/getaddress`,
      CREATE_CONTACT: `${BASE_URL}/user/createcontact`,
      GET_CONTACTS: `${BASE_URL}/user/getcontacts`,
      CREATE_CONTACT_AND_ADDRESS: `${BASE_URL}/user/createcontactandaddress`,
      GET_CONTACT_AND_ADDRESS: `${BASE_URL}/user/getcontactandaddress`,
      UPDATE_DEFAULT_ADDRESS: `${BASE_URL}/user/updatedefaultaddress`,
    },
  },
  CATEGORY_TYPE: {
    CREATE: `${BASE_URL}/api/createcategorytype`,
    GET_ALL: `${BASE_URL}/api/getallcategorytype`,
    GET_CATEGORY_BY_TYPE_ID: `${BASE_URL}/api/get_category_by_categoryTypeId?categoryTypeId=`,
    GET_PRODUCT_BY_TYPE_ID: `${BASE_URL}/api/get_product_by_categoryTypeId?categoryTypeId=`,
  },
  CATEGORY: {
    CREATE: `${BASE_URL}/api/createcategory`,
    GET_ALL: `${BASE_URL}/api/getallcategory`,
    GET_PRODUCTS_BY_CATEGORY_ID: `${BASE_URL}/api/get_product_by_categoryId?categoryId=1`,
  },
  BRAND: {
    CREATE: `${BASE_URL}/api/createbrand`,
    GET_ALL: `${BASE_URL}/api/getallbrand`,
  },
  PRODUCT: {
    CREATE: `${BASE_URL}/api/createproduct`,
    GET_ALL: `${BASE_URL}/api/getallproduct`,
    GET_BY_ID: `${BASE_URL}/api/getprodutbyid?productId=`,
    ATTRIBUTES: {
      CREATE_TYPE: `${BASE_URL}/api/createproductattributetype`,
      GET_ALL_TYPE: `${BASE_URL}/api/getallproductattributetype`,
      CREATE: `${BASE_URL}/api/createproductattribute`,
      GET_ALL: `${BASE_URL}/api/getallproductattribute`,
    },
  },
  COLOR: {
    CREATE: `${BASE_URL}/api/createproductbasedoncolor`,
    GET_ALL: `${BASE_URL}/api/getallproductbasedoncolor`,
    GET_BY_ID: `${BASE_URL}/api/getprodcutcolorbyid?productId=`,
  },
  MEDIA: {
    CREATE: `${BASE_URL}/api/createmedia`,
    GET_ALL: `${BASE_URL}/api/getallmedia`,
    GET_BY_ID: `${BASE_URL}/api/getproductcolorimagesbycolorid?productColorId=`,
  },
  SIZE: {
    CREATE: `${BASE_URL}/api/createsize`,
    GET_ALL: `${BASE_URL}/api/getallsize`,
  },
  MEASUREMENT: {
    CREATE_TYPE: `${BASE_URL}/api/createmeasurementtype`,
    GET_ALL_TYPE: `${BASE_URL}/api/getallmeasurementtype`,
    GET_BY_ID: `${BASE_URL}/api/getmeasurementbyid?productId=`,
  },
  UNIT: {
    CREATE: `${BASE_URL}/api/createunit`,
    GET_ALL: `${BASE_URL}/api/getallunit`,
  },
  SIZE_MEASUREMENT: {
    CREATE: `${BASE_URL}/api/createproductsizemeasurement`,
    GET_ALL: `${BASE_URL}/api/getallproductsizemeasurement`,
  },
  TRENDING: {
    CREATE: `${BASE_URL}/api/createtrending`,
    GET_ALL: `${BASE_URL}/api/getalltrending`,
  },
  PAYMENT: {
    PAY: `${BASE_URL}/api/pay`,
    CALCULATE: `${BASE_URL}/api/checkoutcalculate`,
  },
  BANNER: {
    GET: `${BASE_URL}/admin/getbanners`,
  },
  FILTER: {
    COLORS: `${BASE_URL}/filter/getallcolors`,
    SIZES: `${BASE_URL}/filter/getallsizes`,
    SEARCH: `${BASE_URL}/filter/searchproducts`,
    SIMILAR: `${BASE_URL}/filter/similarproducts`,
  },
} as const;

export const obj = { shor: 'hi' };
