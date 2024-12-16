import { useMutation } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import api from '../../../http/axiosconfig';
import { API_ROUTES } from '../../../kv';
import { useAddressAndContactStore } from '../../../store/useStore';

interface IFormInput {
  name: string;
  email: string;
  phone: string;
  address: string;
  locality: string;
  postal_code: string;
  city: string;
  state: string;
  country: string;
  isDefault: boolean;
}

async function postAddAddress(data: IFormInput) {
  const res = await api.post(
    API_ROUTES.USER.ADDRESS.CREATE_CONTACT_AND_ADDRESS,
    data
  );
  return res.data;
}

export default function AddAddressBox({
  setSwitchAddress,
}: {
  setSwitchAddress: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { register, handleSubmit } = useForm<IFormInput>();
  const { setAddedNewAddress } = useAddressAndContactStore();

  const mutation = useMutation({
    mutationFn: postAddAddress,
    onSuccess: (data) => {
      console.log('address added', data);
      setSwitchAddress(true);
      setAddedNewAddress('changed');
    },
    onError: (error: { response: { data: { msg: string } } }) => {
      console.log(error);
      alert('error adding address');
    },
  });

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log('i am getting called');
    console.log(data);

    mutation.mutate(data);
  };

  return (
    <>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        <label className="flex flex-col font-bold">
          Full Name
          <input
            {...register('name', { required: true, maxLength: 20 })}
            className="p-3 rounded-md font-semibold border-b"
            placeholder="Enter Full Name"
          />
        </label>

        <label className="flex flex-col font-bold border-b">
          Mobile Number
          <input
            {...register('phone', { required: true, maxLength: 20 })}
            className="p-3 rounded-md font-semibold"
            placeholder="Enter Mobile Number"
          />
        </label>

        <label className="flex flex-col font-bold border-b">
          Email
          <input
            type="email"
            {...register('email', { required: true, maxLength: 50 })}
            className="p-3 rounded-md font-semibold"
            placeholder="Enter Email"
          />
        </label>

        <label className="flex flex-col font-bold border-b">
          Address
          <input
            {...register('address', { required: true, maxLength: 50 })}
            className="p-3 rounded-md font-semibold"
            placeholder="Address (House no, Building Street)"
          />
        </label>

        <label className="flex flex-col font-bold border-b">
          Locality
          <input
            {...register('locality', { required: true, maxLength: 20 })}
            className="p-3 rounded-md font-semibold"
            placeholder="Enter Locality"
          />
        </label>

        <label className="flex flex-col font-bold border-b">
          PIN Code
          <input
            {...register('postal_code', { required: true, maxLength: 20 })}
            className="p-3 rounded-md font-semibold"
            placeholder="Enter Pin Code"
          />
        </label>

        <label className="flex flex-col font-bold border-b">
          City
          <input
            {...register('city', { required: true, maxLength: 20 })}
            className="p-3 rounded-md font-semibold"
            placeholder="Enter City"
          />
        </label>

        <label className="flex flex-col font-bold border-b">
          State
          <input
            {...register('state', { required: true, maxLength: 20 })}
            className="p-3 rounded-md font-semibold"
            placeholder="Enter State"
          />
        </label>

        <label className="flex flex-col font-bold border-b">
          Country
          <input
            {...register('country', { required: true, maxLength: 20 })}
            className="p-3 rounded-md font-semibold"
            placeholder="Enter Country"
          />
        </label>

        <label className="flex gap-2">
          <input type="checkbox" {...register('isDefault')} />
          Set as Default Address
        </label>

        <div className="absolute bottom-0 w-full left-0 bg-background">
          <div className="flex w-full gap-4 p-4 shadow-top">
            <button
              className="w-full bg-transparent p-3 rounded-md text-secondary font-bold border-2 border-secondary"
              onClick={() => setSwitchAddress(true)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-full bg-secondary p-3 rounded-md text-white font-bold"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
