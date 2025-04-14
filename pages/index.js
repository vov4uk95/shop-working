import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Модерна Дама</title>
      </Head>
      <h1>Добре дошли в Модерна Дама</h1>
      <Link href="/catalog">Към Каталога</Link> | <Link href="/cart">Количка</Link>
    </div>
  );
}
