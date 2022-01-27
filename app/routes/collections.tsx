import { Outlet } from "remix";

export default function CollectionRoute() {
  return <div className="flex flex-nowrap">
    <aside className="w-28 flex-shrink-0">
      stuff here
    </aside>
    <main>
      <Outlet />
    </main>
  </div>
}