import IncreaseIcon from "./IncreaseIcon";

const HealthInsight = ({ increase, parameter, percentageChange, normalRange, lastTest, currentTest }) => {
    return (
        <div style={{
            marginTop: "20px",
            borderRadius: "5px",
            background: "#fff",
            padding: "8px 10px"
        }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >

                <div
                    style={{
                        color: "#000",
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 500,
                        lineHeight: "19.356px",
                        flex: 1
                    }}
                >
                    <spna style={{ color: "var(--Colour-Palette-Secondary-Error-R800, #CC4C4E)" }}> {increase ? "High" : "Low"} </spna>
                    {parameter}
                </div>
                <div
                    style={{
                        backgroundColor: "var(--Colour-Palette-Secondary-Warning-O200, #FFC9A0)",
                        borderRadius: "4px",
                        color: "var(--Colour-Palette-Secondary-Warning-O1000, #784C2A)",
                        fontFamily: "Inter",
                        fontSize: "10px",
                        fontStyle: "normal",
                        fontWeight: "700",
                        lineHeight: "16px", /* 160% */
                        textTransform: "uppercase",
                        display: "flex",
                        alignItems: "center",
                        padding: "5px 10px",
                        justifyContent: "center"
                    }}
                >
                    Rapid {increase ? "increase" : "decrease"}

                </div>
            </div>

            <div>
                <IncreaseIcon color="red" />
                <span>Rapid {increase ? "Increase": "Decrease"} by {percentageChange}%</span>
                <span> </span>
            </div>

        </div>
    )
};

const RapidIncrease = () => {
    const increase = true;
    const parameter = "LDL Cholesterol - Direct";
    const percentageChange = "40";
    const normalRange = "<100 mg/dl";
    const currentTest = {
        date: "17 May, 2022",
        value: 110
    };
    const lastTest = {
        date: "10 April, 2022",
        value: 80
    }
    return (
        <div>
            <div style={{
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "24px"
            }}>
                Recently Found!
            </div>
            <div
                style={{
                    color: "var(--Colour-Palette-Neutral-Dark-N200, #8897A2)",
                    fontFamily: "Inter",
                    fontSize: "12px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    lineHeight: "16px"
                }}
            >
                Rapid inc. in range was found recently
            </div>
            <HealthInsight
                increase={increase}
                parameter={parameter}
                percentageChange={percentageChange}
                normalRange={normalRange}
                currentTest={currentTest}
                lastTest={lastTest}
            />
        </div>
    )
};
export default RapidIncrease;
