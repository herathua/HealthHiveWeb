import HeaderContent from "./Components/HeaderContent/HeaderContent"
import FooterContent from "./Components/FooterContent/FooterContent"
import BodyContent from "./Components/BodyContent/BodyContent"
import SideBarContent from "./Components/SideBarContent/SideBarContent"
function App() {
    return (
        <>
            <div id="wrapper">
                <HeaderContent />
                <div className="flex">
                    <SideBarContent />
                    <BodyContent />
                </div>
                <FooterContent />
            </div>
        </>
    )
}
export default App