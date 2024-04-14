import Navbar from "./Navbar";


export default function Sidebar() {

    return (
        <div className="bg-slate-800 w-96  flex-col" style= {{height: 'calc(100vh - 64px)'}}>
            <div className="m-5 h-64 border items-center justify-center">
                
            </div>


            <div className="divider"/>


            <ul className="menu p-4 bg-base-200 text-base-content">
                <details>
                    <summary>Test</summary>
                    <li><a>Sidebar Item 1</a></li>
                    <li><a>Sidebar Item 2</a></li>
                </details>
                    <li>Sidebar Item 3</li>
            </ul>

        </div>
    )
}