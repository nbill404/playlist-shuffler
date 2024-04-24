

export default function SidebarPlaylist() {
    return (
        <ul className="menu p-4 bg-base-200 text-base-content">
            <details>
                <summary className="rounded hover:bg-base-100">Test</summary>
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
            </details>
            <li className="rounded hover:bg-base-100">Sidebar Item 3</li>
        </ul>
    )
}