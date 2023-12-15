import OrganReport from "../../components/OrganReports";
import RapidIncrease from "../../components/RapidIncrease";

const Landing = () => {
    return (
        <>
            <div style={{ padding: "10px 20px", background: "var(--Colour-Palette-Neutral-Light-N10, #F5F8FC)" }}>
                <RapidIncrease />
            </div>
            <OrganReport />
        </>
    );
};

export default Landing;