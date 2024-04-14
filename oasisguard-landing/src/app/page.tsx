export default function Home() {
  const faq = [
    {
      q: "What is OASISGUARD?",
      a: "OASISGUARD is a browser extension that secures your passwords in a confidential smart contract on Sapphire's Confidential EVM, accessed exclusively via your unique Passkey and authenticated through r1 curve signatures on Oasis.",
    },
    {
      q: "How does OASISGUARD work?",
      a: "OASISGUARD uses a Oasis Sapphire to store confidential information on-chain.",
    },
    {
      q: "Can I hold my private keys in OASISGUARD?",
      a: "OASISGUARD allows you storing any private information on-chain, and your private keys are no exception.",
    },
    {
      q: "Can I import my passwords from Google Passwords?",
      a: "OASISGUARD supports imports from Google Passwords, and other password managers.",
    },
    {
      q: "Do I need to pay gas fees for each account detail I add?",
      a: "No, you don't need to pay gas fees for that. We've integrated Paymaster. We handle this using the EIP155Signer.sign() method to broadcast the transactions you send, through our Gasless Proxy contract.",
    },
  ];

  const DOWNLOAD_URL =
    "https://raw.githubusercontent.com/itublockchain/ethdam-oasis-guard/main/build/oasisguard-extension.zip";

  return (
    <>
      <main className="flex min-h-screen flex-col justify-between max-w-[1280px] m-auto pl-10 pr-10">
        <div className="mt-auto mb-auto z-50">
          {/* eslint-disable-next-line */}
          <img src="/logo.png" alt="OasisGuard" className="w-[300px]" />
          <p className="mt-8 font-light text-xl text-neutral-400 max-w-[400px]">
            Onchain Password Manager, Hardware-Level Security with Passkeys
          </p>
          <a
            target="_blank"
            href={DOWNLOAD_URL}
            className="bg-white flex w-max items-center mt-8 text-black pl-4 pr-4 h-[48px] rounded-lg"
          >
            Install OASISGUARD for Chrome
          </a>
        </div>
        <div className="flex pointer-events-none w-[629px] h-[594px] absolute top-[50%] left-[65%] translate-x-[-50%] translate-y-[-50%]">
          <div className="w-[100%] h-[100%] bg-[rgba(0,0,0,0.4)] translate-x-3 absolute z-20 scale-[1.5]"></div>
          <video
            autoPlay
            loop
            muted
            className="w-[100%] h-[100%] rotate-[-140deg] absolute"
          >
            <source src="/animation.mp4" type="video/mp4" />
          </video>
          {/* eslint-disable-next-line */}
          <img
            alt="Animation"
            src="/animation-bg.png"
            className="w-[100%] h-[100%] z-10 shrink-0 translate-x-[70px] translate-y-[-55px]"
          />
        </div>
      </main>

      <main className="flex flex-col justify-between max-w-[1280px] m-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="w-[100%] order-1 md:order-0 flex justify-center">
            <img src="/frame1.png" alt="OasisGuard" className="w-[300px]" />
          </div>

          <div className="flex flex-col order-0 md:order-1 w-[100%] justify-center h-full">
            <h2 className="text-4xl mb-4">Authenticate with biometrics</h2>
            <p className="w-[75%] text-neutral-400 text-lg">
              OASISGUARD uses Passkeys to authenticate you using Biometric
              Authentication.
            </p>
            <a
              target="_blank"
              href={DOWNLOAD_URL}
              className="bg-white flex w-max items-center mt-8 text-black pl-4 pr-4 h-[48px] rounded-lg"
            >
              Get Started with OASISGUARD
            </a>
          </div>
        </div>
      </main>

      <main className="flex flex-col justify-between max-w-[1280px] m-auto p-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24">
          <div className="flex flex-col w-[100%] justify-center h-full">
            <h2 className="text-4xl mb-4">Store your Private Keys</h2>
            <p className="w-[75%] text-neutral-400 text-lg">
              Store your private keys/seed phrases on-chain with OASISGUARD. Do
              not worry about writing your seed phrases on a piece of paper
              anymore.
            </p>
            <a
              target="_blank"
              href="https://drive.google.com/file/d/1dUCdJGHMhk3I9tJUvbUV92t2DEex8prT/view?usp=sharing"
              className="bg-white flex w-max items-center mt-8 text-black pl-4 pr-4 h-[48px] rounded-lg"
            >
              Get Started with OASISGUARD
            </a>
          </div>

          <div className="w-[100%] flex justify-center">
            <img src="/frame2.png" alt="OasisGuard" className="w-[300px]" />
          </div>
        </div>
      </main>

      <main className="flex min-h-screen relative flex-col justify-between m-auto pt-24 pl-4 pr-4">
        {/* eslint-disable-next-line */}
        <img
          src="/bg.png"
          alt="Background"
          className="top-0 left-0 w-[100%] h-[100%] absolute hidden lg:flex"
        />
        <div className="mx-auto max-w-[1280px] z-10">
          <h2 className="text-center text-3xl lg:text-5xl leading-relaxed text-neutral-400">
            Frequently Asked Questions
          </h2>
          <div className="mt-20">
            {faq.map((item) => (
              <div key={item.q} className="flex flex-col max-w-[75%] mx-auto ">
                <p className="text-neutral-200 text-xl lg:text-3xl mb-2">
                  {item.q}
                </p>
                <p className="text-neutral-400 text-small lg:text-xl mb-8 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
