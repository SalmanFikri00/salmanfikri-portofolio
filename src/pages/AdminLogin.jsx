import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseClient } from '../lib/supabaseClient';
import { useAdminSession } from '../context/AdminSessionContext';
import Cursor from '../components/Cursor';

const AdminLogin = () => {
  const navigate = useNavigate();
  const { isAdmin, isLoading, refreshProfile } = useAdminSession();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isLoading && isAdmin) {
      navigate('/admin/00/dashboard', { replace: true });
    }
  }, [isAdmin, isLoading, navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const { error: signInError } = await supabaseClient.auth.signInWithPassword({
        email: form.email.trim().toLowerCase(),
        password: form.password,
      });

      if (signInError) {
        setError(signInError.message ?? 'Invalid credentials.');
        return;
      }

      await refreshProfile();

      const { data: userResult, error: userError } = await supabaseClient.auth.getUser();

      if (userError || !userResult?.user) {
        setError('Unable to load user session. Please try again.');
        await supabaseClient.auth.signOut();
        return;
      }

      const { data: profile, error: profileError } = await supabaseClient
        .from('profiles')
        .select('is_admin')
        .eq('user_id', userResult.user.id)
        .maybeSingle();

      if (profileError) {
        setError('Unable to load admin profile. Please try again.');
        await supabaseClient.auth.signOut();
        return;
      }

      if (!profile?.is_admin) {
        setError('Account does not have admin access.');
        await supabaseClient.auth.signOut();
        return;
      }

      navigate('/admin/00/dashboard', { replace: true });
    } catch (submitError) {
      console.error(submitError);
      setError('Unable to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-6">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-700 rounded-xl p-8 shadow-2xl">
        <div className="mb-6 text-center">
          <p className="uppercase tracking-widest text-xs text-zinc-500">Admin Access</p>
          <h1 className="text-3xl font-semibold mt-2">Portfolio Control Room</h1>
          <p className="text-sm text-zinc-400 mt-1">
            Enter your credentials to manage projects and categories.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="text-sm text-zinc-400 uppercase tracking-wide">Email</span>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </label>

          <label className="block">
            <span className="text-sm text-zinc-400 uppercase tracking-wide">Password</span>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              autoComplete="current-password"
              className="mt-1 w-full rounded-md border border-zinc-700 bg-zinc-950 px-4 py-3 text-sm focus:border-white focus:outline-none focus:ring-1 focus:ring-white"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-white px-4 py-3 text-sm font-medium uppercase tracking-wide text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-zinc-500"
          >
            {isSubmitting ? 'Signing In…' : 'Sign In'}
          </button>
        </form>

        {error && <p className="mt-4 text-sm text-red-400 text-center">{error}</p>}
      </div>
      <Cursor />
    </div>
  );
};

export default AdminLogin;
