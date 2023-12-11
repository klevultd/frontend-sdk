import Image from "next/image"
import { Fragment } from "react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="grid justify-items-center">
      <h1 className="text-4xl center">Hello from Klevu Next.js example</h1>
      <form method="GET" action="/search">
        <div className="p-16">
          <input
            className="text-black m-2 p-4 w-96"
            type="text"
            name="term"
            placeholder="Type what you want to search"
          />
          <input
            className="bg-amber-600 m-2 p-4"
            type="submit"
            value="Search"
          />
        </div>
      </form>
      <br />
      <Link href="/category/men">
        Category page with `@klevu/ui-react` here.
      </Link>
    </div>
  )
}
