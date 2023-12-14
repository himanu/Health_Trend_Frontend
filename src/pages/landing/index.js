import RapidIncrease from "../../components/RapidIncrease";
import UserNavbar from "../../components/UserNavbar";

const Landing = () => {
    return (
        <>
            <UserNavbar />
            <div style={{ padding: "10px 20px", background: "var(--Colour-Palette-Neutral-Light-N10, #F5F8FC)" }}>
                <RapidIncrease />
            </div>
        </>
    );
};

export default Landing;