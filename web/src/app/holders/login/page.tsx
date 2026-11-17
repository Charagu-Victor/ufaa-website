"use client";

import { useState, type FormEvent } from "react";

function makeChallenge() {
  const left = Math.floor(Math.random() * 9) + 1;
  const right = Math.floor(Math.random() * 9) + 1;
  return { left, right, answer: left + right };
}

export default function HolderLoginPage() {
  const [challenge, setChallenge] = useState(makeChallenge);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (Number(form.get("human-check")) !== challenge.answer) {
      setMessage("Please solve the human verification question and try again.");
      return;
    }
    setMessage("Holder portal sign-in is not connected yet. Please contact UFAA for assistance.");
  }

  function refreshChallenge() {
    setChallenge(makeChallenge());
  }

  return (
    <section className="min-h-[calc(100vh-10rem)] bg-[#f3f4fa] px-4 py-8 sm:py-12">
      <div className="mx-auto w-full max-w-[584px] overflow-hidden rounded-md bg-white shadow-[0_8px_30px_rgba(25,35,75,0.08)]">
        <header className="bg-[#fae69e] px-6 pb-7 pt-5 text-center text-[#192c72] sm:px-[25px]">
          <h1 className="text-xl font-semibold leading-8">UFAA Holders Portal</h1>
          <div className="mt-3 border-t border-[#e2d391] pt-3">
            <h2 className="text-[22px] font-semibold">Login</h2>
          </div>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6 px-6 py-6 sm:px-[25px] sm:py-6">
          <div>
            <label htmlFor="email" className="mb-2 block text-base text-[#3e496d]">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              placeholder="Enter the email you registered with"
              className="h-12 w-full rounded border border-[#c9cfee] bg-white px-4 text-base text-[#26345c] outline-none placeholder:text-[#aab3d8] focus:border-[#6269ea] focus:ring-2 focus:ring-[#6269ea]/20"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-base text-[#3e496d]">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-12 w-full rounded border border-[#c9cfee] bg-white px-4 text-base text-[#26345c] outline-none focus:border-[#6269ea] focus:ring-2 focus:ring-[#6269ea]/20"
            />
          </div>

          <label className="flex w-fit items-center gap-2 text-base text-[#3e496d]">
            <input type="checkbox" name="remember" className="size-[14px] accent-[#6269ea]" />
            Remember Me
          </label>

          <div className="space-y-3 pt-1">
            <p className="text-base italic text-[#85899d]">Hi there, prove you&apos;re human:</p>
            <div className="flex items-center justify-between gap-4 text-base text-[#3e496d]">
              <span>{challenge.left} + {challenge.right} = ?</span>
              <button
                type="button"
                onClick={refreshChallenge}
                className="text-sm text-[#7650d9] hover:underline"
                aria-label="Refresh human verification question"
              >
                🔄 Refresh
              </button>
            </div>
            <input
              name="human-check"
              type="number"
              inputMode="numeric"
              required
              aria-label="Answer to the human verification question"
              placeholder="Your answer"
              onChange={(event) => {
                const valid = Number(event.target.value) === challenge.answer;
                event.currentTarget.setCustomValidity(valid || !event.target.value ? "" : "Please solve the math question.");
              }}
              className="h-12 w-full rounded border border-[#c9cfee] bg-white px-4 text-base text-[#26345c] outline-none placeholder:text-[#aab3d8] focus:border-[#6269ea] focus:ring-2 focus:ring-[#6269ea]/20"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 text-base text-[#d39b08]">
            <button type="button" onClick={() => setMessage("Password recovery is not connected yet. Please contact UFAA for assistance.")} className="hover:underline">
              Forgot password?
            </button>
            <button type="button" onClick={() => setMessage("Holder registration is not connected yet. Please contact UFAA for assistance.")} className="hover:underline">
              Don&apos;t have an account? Register
            </button>
          </div>

          {message && <p role="status" className="text-sm text-[#3e496d]">{message}</p>}

          <button
            type="submit"
            className="mt-5 h-[49px] w-full rounded border border-[#4148dd] bg-[#6268e8] text-base font-medium text-white hover:bg-[#535be0] focus-visible:outline-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
