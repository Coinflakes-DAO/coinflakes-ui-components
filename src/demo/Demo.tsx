import TopBar from "../global/TopBar";
import MainGrid from "../components/MainGrid";
import TokenAmountTextFieldDemo from "./TokenAmountTextFieldDemo";

function Demo() {
    return (
        <div className="app">
            <main className="content">
                <TopBar></TopBar>
                <MainGrid>
                    <TokenAmountTextFieldDemo />
                </MainGrid>
            </main>
        </div>
    );
}

export default Demo;
