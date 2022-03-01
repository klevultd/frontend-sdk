import { Fragment } from "react"
import { Popover, Transition } from "@headlessui/react"
import { MenuIcon } from "@heroicons/react/outline"
import { ChevronDownIcon } from "@heroicons/react/solid"
import Link from "next/link"
import SVG from "react-inlinesvg"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

export function Header({
  topnav,
}: {
  topnav: Array<{
    title: string
    slug: string
    children: Array<{
      title: string
      slug: string
      linkDescription: string
      linkIcon: {
        url: string
      }
    }>
  }>
}) {
  return (
    <Popover className="relative bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10 px-4 sm:px-6">
          <div className="flex justify-start lg:w-0 lg:flex-1">
            <a href="#">
              <span className="sr-only">Klevu</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="/klevu-developers-logo-blue.svg"
                alt="Klevu developers"
              />
            </a>
          </div>
          <div className="-mr-2 -my-2 md:hidden">
            <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
              <span className="sr-only">Open menu</span>
              <MenuIcon className="h-6 w-6" aria-hidden="true" />
            </Popover.Button>
          </div>
          <Popover.Group as="nav" className="hidden md:flex space-x-10">
            {topnav.map((topNavItem) => (
              <Fragment>
                {topNavItem.children ? (
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={classNames(
                            open ? "text-gray-900" : "text-gray-500",
                            "group bg-white rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lime-500 p-2"
                          )}
                        >
                          <span>{topNavItem.title}</span>
                          <ChevronDownIcon
                            className={classNames(
                              open ? "text-gray-600" : "text-gray-400",
                              "ml-2 h-5 w-5 group-hover:text-gray-500"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-sm sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                {topNavItem.children.map((item, index) => (
                                  <Link
                                    key={index}
                                    href={`/article/${item.slug}`}
                                  >
                                    <a className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                      {item.linkIcon ? (
                                        <SVG
                                          className="flex-shrink-0 h-6 w-6 text-lime-500"
                                          aria-hidden="true"
                                          src={item.linkIcon.url}
                                          width={24}
                                          height="auto"
                                        />
                                      ) : (
                                        <div />
                                      )}
                                      <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                          {item.title}
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {item.linkDescription}
                                        </p>
                                      </div>
                                    </a>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ) : (
                  <Link href={`/article/${topNavItem.slug}`}>
                    <a className="text-base font-medium text-gray-500 hover:text-gray-900">
                      {topNavItem.title}
                    </a>
                  </Link>
                )}
              </Fragment>
            ))}
          </Popover.Group>
        </div>
      </div>
    </Popover>
  )
}
