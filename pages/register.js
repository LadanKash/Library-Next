import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import Layout from '../components/Layout';

function RegisterPage() {
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
    formState: { errors },
    getValues,
  } = useForm();

  async function registerHandler({ name, email, password }) {
    try {
      const response = await fetch('/api/user', {
        method: 'POST',
        body: JSON.stringify({ name, email, password }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!');
      }
      console.log('User registered:', data); // Debugging message
      return data; // Return the user data
    } catch (error) {
      console.log('Registration error:', error.message); // Debugging message
      throw error;
    }
  }

  async function submitHandler(data) {
    try {
      const user = await registerHandler(data);
      console.log('Attempting to sign in...');
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });
      if (result.error) {
        console.log('Sign-in failed:', result.error); // Debugging message
      } else {
        console.log('Sign-in successful'); // Debugging message
        router.push('/login'); // Redirect to login page
      }
    } catch (err) {
      console.log('Submit handler error:', err); // Debugging message
    }
  }

  return (
    <Layout title="Register">
      <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
        <h2 className="mb-4 text-xl">Register Form</h2>
        <div className="mb-4">
          <input
            {...register('name', { required: true })}
            type="text"
            className="w-full rounded-xl p-2 outline-0"
            id="name"
            placeholder="Name"
            autoFocus
          />
          {errors.name && <div className="text-red-500">Please enter your name.</div>}
        </div>
        <div className="mb-4">
          <input
            {...register('email', { required: true })}
            type="email"
            className="w-full rounded-xl p-2 outline-0"
            id="email"
            placeholder="Email"
          />
          {errors.email && <div className="text-red-500">Please enter email.</div>}
        </div>
        <div className="mb-4">
          <input
            {...register('password', {
              required: true,
              minLength: {
                value: 5,
                message: 'Password must be at least 5 chars.',
              },
            })}
            type="password"
            className="w-full rounded-xl p-2 outline-0"
            id="password"
            placeholder="Password"
          />
          {errors.password && <div className="text-red-500">{errors.password.message}</div>}
        </div>
        <div className="mb-4">
          <input
            {...register('repassword', {
              required: true,
              validate: (value) => value === getValues('password') || 'Passwords do not match',
            })}
            type="password"
            className="w-full rounded-xl p-2 outline-0"
            id="repassword"
            placeholder="Confirm Password"
          />
          {errors.repassword && <div className="text-red-500">{errors.repassword.message}</div>}
        </div>
        <div className="mb-4">
          <button 
            // onClick={() => router.push('/login')}
          className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28 hover:bg-slate-800" type="submit">
            Register
          </button>
        </div>
        <div className="mb-4">
        <h2>If you have account</h2> 
          <Link href="/login" legacyBehavior>
            <a>Login</a>
          </Link> 
        </div>
      </form>
    </Layout>
  );
}

export default RegisterPage;

