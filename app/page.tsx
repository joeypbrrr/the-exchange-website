"use client";

import { useRef } from "react";
import { Diorama } from "@/components/diorama";
import { asset } from "@/lib/base-path";

const INSTAGRAM = "https://www.instagram.com/the.exchange610/";

const TITLE = "THE EXCHANGE";

const categories = [
  {
    title: "Gold",
    copy: "Sell your gold bars and coins.",
    image: asset("/still-gold.webp"),
    alt: "Stylized gold bar",
  },
  {
    title: "Phones",
    copy: "Trade in your used smartphones.",
    image: asset("/still-phone.webp"),
    alt: "Stylized phone",
  },
  {
    title: "Sneakers",
    copy: "Cash in your designer sneakers.",
    image: asset("/still-sneaker.webp"),
    alt: "Stylized sneaker",
  },
  {
    title: "Electronics",
    copy: "Sell your gaming consoles and laptops.",
    image: asset("/still-electronics.webp"),
    alt: "Stylized electronics",
  },
];

function letterColor(index: number, count: number) {
  const t = count <= 1 ? 0 : index / (count - 1);
  const from = [146, 56, 255];
  const to = [47, 107, 255];
  const mix = from.map((channel, channelIndex) =>
    Math.round(channel + (to[channelIndex] - channel) * t),
  );
  return `rgb(${mix.join(",")})`;
}

export default function HomePage() {
  const heroRef = useRef<HTMLElement>(null);
  const letters = TITLE.split("");
  const mid = (letters.length - 1) / 2;

  return (
    <>
      <header className="site-header">
        <a href="#top" aria-label="The Exchange, buy sell trade">
          <img className="wordmark" src={asset("/wordmark.webp")} alt="The Exchange. Buy, sell, trade." />
        </a>
        <nav className="site-nav" aria-label="Page">
          <a href="#buy">What we buy</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" ref={heroRef} aria-labelledby="hero-title">
          <h1 className="hero-title" id="hero-title">
            {letters.map((letter, index) => {
              const arch = Math.pow((index - mid) / mid, 2) * 22;
              if (letter === " ") {
                return <span key={index} style={{ width: "0.28em" }} aria-hidden />;
              }
              return (
                <span
                  key={index}
                  style={{
                    color: letterColor(index, letters.length),
                    transform: `translateY(${arch}px)`,
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </h1>
          <p className="hero-script">
            Buy, Sell, Trade
            <svg viewBox="0 0 420 22" aria-hidden="true">
              <path
                d="M8 14 C 80 4, 160 18, 250 8 S 360 16, 412 6"
                fill="none"
                stroke="#fff"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </svg>
          </p>
          <Diorama scrollRoot={heroRef} />
          <p className="support">Got stuff? Get paid.</p>
          <div className="hero-actions">
            <a className="primary" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              Message on Instagram
            </a>
            <a className="ghost" href="#buy">
              What we buy
            </a>
          </div>
        </section>

        <section className="buy" id="buy">
          <h2>WHAT WE BUY</h2>
          <div className="buy-grid">
            {categories.map((item) => (
              <article key={item.title}>
                <img src={item.image} alt={item.alt} width={360} height={280} />
                <h3>{item.title.toUpperCase()}</h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="band" id="contact">
          <h2>IN WITH STUFF. OUT WITH CASH.</h2>
          <a className="primary" href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            <strong>Message @the.exchange610</strong>
            <span>Reading, Pennsylvania</span>
          </a>
        </section>
      </main>

      <footer className="site-footer">
        <img className="wordmark" src={asset("/wordmark.webp")} alt="" />
        <p>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
            @the.exchange610
          </a>
          <br />
          Reading, Pennsylvania
        </p>
      </footer>
    </>
  );
}
