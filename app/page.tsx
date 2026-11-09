import { asset } from "@/lib/base-path";

const INSTAGRAM = "https://www.instagram.com/the.exchange610/";

export default function HomePage() {
  return (
    <div className="page" id="top">
      <header className="bar">
        <a className="logo-link" href="#top">
          <img src={asset("/art/logo.png")} alt="The Exchange. Buy, sell, trade." />
        </a>
        <nav aria-label="Page">
          <a href="#buy">What we buy</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <main>
        <h1 className="sr-only">The Exchange. Buy, sell, trade.</h1>
        <img
          className="slice"
          src={asset("/art/hero.png")}
          alt="The Exchange. Buy, sell, trade. A phone, a sneaker, and gold. Got stuff? Get paid."
        />
        <div className="actions">
          <a className="btn primary" href={INSTAGRAM}>
            Message on Instagram
          </a>
          <a className="btn ghost" href="#buy">
            What we buy
          </a>
        </div>

        <section id="buy">
          <h2 className="sr-only">What we buy</h2>
          <img
            className="slice"
            src={asset("/art/buy.png")}
            alt="What we buy: gold, phones, sneakers, and electronics."
          />
        </section>

        <section id="contact" className="band">
          <p>IN WITH STUFF. OUT WITH CASH.</p>
          <a className="btn primary stack" href={INSTAGRAM}>
            <strong>Message @the.exchange610</strong>
            <span>Reading, Pennsylvania</span>
          </a>
        </section>

        <footer>
          <a className="logo-link" href="#top">
            <img src={asset("/art/logo.png")} alt="" />
          </a>
          <p>
            <a href={INSTAGRAM}>@the.exchange610</a>
            <br />
            Reading, Pennsylvania
          </p>
          <img className="pending" src={asset("/art/pending.png")} alt="Street address pending verification" />
        </footer>
      </main>
    </div>
  );
}
