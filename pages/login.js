import Link from 'next/link';
import React, { forwardRef } from 'react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { signIn, useSession } from 'next-auth/react';
import Layout from "../components/Layout";


function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const { redirect } = router.query;


  useEffect(() => {
    if (session?.user) {
      router.push(redirect || '/');
    }
  }, [router, session, redirect]);


  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();


  async function submitHandler({ email, password }) {
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });


      if (result.error) {
        console.log('failed');
      }
    } catch (err) {
      console.log(err);
    }
  }


  return (
    <Layout title='Login'>
      <form
        className='mx-auto max-w-screen-md'
        onSubmit={handleSubmit(submitHandler)}
      >
        <h2 className='mb-4 text-xl'>Login</h2>
        <div className='mb-4'>
          <input
            {...register('email', { required: true })}
            type='email'
            className='w-full rounded-xl p-2 outline-0'
            id='email'
            placeholder='Email'
            autoFocus
          />
          {errors.email && (
            <div className='text-red-500'>Please enter email.</div>
          )}
        </div>
        <div className='mb-4'>
          <input
            {...register('password', {
              required: true,
              minLength: {
                value: 5,
                message: 'Password must be at least 5 chars.',
              },
            })}
            type='password'
            className='w-full rounded-xl p-2 outline-0'
            id='password'
            placeholder='Password'
          />
          {errors.password && (
            <div className='text-red-500'>{errors.password.message}</div>
          )}
        </div>
        <div className='mb-4'>
          <button className='rounded-xl bg-gray-700 text-white px-4 py-2 w-28 
          hover:bg-slate-800'>
            Login
          </button>
        </div>
        <div className='mb-4'>
          <Link href='/' legacyBehavior>
            <a></a>
          </Link>
        </div>
      </form>
    </Layout>
  );
}


export default LoginPage;
