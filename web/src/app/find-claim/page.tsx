"use client";

import { useState, type FormEvent } from "react";

function makeChallenge() {
  const left = Math.floor(Math.random() * 9) + 1;
  const right = Math.floor(Math.random() * 9) + 1;
  return { left, right, answer: left + right };
}

export default function FindClaimPage() {
  const [challenge, setChallenge] = useState(makeChallenge);
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    if (Number(form.get("human-check")) !== challenge.answer) {
      setMessage("Please solve the human verification question and try again.");
      return;
    }
    setMessage("The search claims portal is not connected yet. Please contact UFAA for assistance.");
  }

  return (
    <section className="min-h-screen bg-[#f3f4fa] px-4 py-7 sm:px-6 sm:py-[29px]">
      <div className="mx-auto w-full max-w-[571px] overflow-hidden rounded-md bg-white shadow-[0_8px_30px_rgba(25,35,75,0.08)]">
        <header className="bg-[#fae69e] px-6 pb-[56px] pt-7 text-center text-[#192c72] sm:px-[31px]">
          <h1 className="text-[22px] font-semibold leading-8 sm:text-2xl">UFAA Search Claims Portal</h1>
          <div className="mt-4 border-t border-[#e2d391]" />
        </header>

        <form onSubmit={handleSubmit} className="space-y-7 px-6 py-7 sm:px-[31px] sm:py-8">
          <div>
            <label htmlFor="email" className="mb-2 block text-xl text-[#3e496d]">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              autoFocus
              placeholder="Email"
              className="h-[61px] w-full rounded-md border border-[#c9cfee] bg-white px-5 text-xl text-[#26345c] outline-none placeholder:text-[#aab3d8] focus:border-[#a875ff] focus:ring-1 focus:ring-[#a875ff]"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-xl text-[#3e496d]">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="h-[61px] w-full rounded-md border border-[#c9cfee] bg-white px-5 text-xl text-[#26345c] outline-none focus:border-[#a875ff] focus:ring-1 focus:ring-[#a875ff]"
            />
          </div>

          <label className="flex w-fit items-center gap-2 text-xl text-[#3e496d]">
            <input type="checkbox" name="remember" className="size-5 accent-[#6269ea]" />
            Remember Me
          </label>

          <div className="space-y-4 pt-1">
            <p className="text-xl italic text-[#85899d]">Hi there, prove you&apos;re human:</p>
            <div className="flex items-center justify-between gap-4 text-xl text-[#3e496d]">
              <span>{challenge.left} + {challenge.right} = ?</span>
              <button
                type="button"
                onClick={() => setChallenge(makeChallenge())}
                className="text-base text-[#7650d9] hover:underline"
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
              className="h-[61px] w-full rounded-md border border-[#c9cfee] bg-white px-5 text-xl text-[#26345c] outline-none placeholder:text-[#aab3d8] focus:border-[#a875ff] focus:ring-1 focus:ring-[#a875ff]"
            />
          </div>

          <button
            type="button"
            onClick={() => setMessage("Password recovery is not connected yet. Please contact UFAA for assistance.")}
            className="text-xl text-[#d39b08] hover:underline"
          >
            Forgot password
          </button>

          {message && <p role="status" className="text-sm text-[#3e496d]">{message}</p>}

          <button
            type="submit"
            className="h-[59px] w-full rounded-md bg-[#c31f26] text-xl font-medium text-white hover:bg-[#aa1820] focus-visible:outline-offset-2"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}
