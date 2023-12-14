import DecreaseIcon from "./DecreaseIcon";
import DiabetesSvg from "./DiabetesSvg";
import IncreaseIcon from "./IncreaseIcon";

const icons = {
    "Diabetes": <DiabetesSvg />
}
const emojis = {
    "happy": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8.00002" cy="8.00004" r="6.06667" stroke="#62BF9F" stroke-width="1.2" />
            <circle cx="6.33336" cy="6.33337" r="1" fill="#62BF9F" />
            <circle cx="9.66664" cy="6.33337" r="1" fill="#62BF9F" />
            <path d="M10 10C10 10.7364 9.10457 11.3334 8 11.3334C6.89543 11.3334 6 10.7364 6 10" stroke="#62BF9F" stroke-width="1.2" stroke-linecap="round" />
        </svg>
    ),
    "sad": (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="7.99967" cy="8.00065" r="6.06667" stroke="#F47779" stroke-width="1.2" />
            <circle cx="6.33301" cy="6.33398" r="1" fill="#F47779" />
            <circle cx="9.66699" cy="6.33398" r="1" fill="#F47779" />
            <path d="M10 11.3333C10 10.597 9.10457 10 8 10C6.89543 10 6 10.597 6 11.3333" stroke="#F47779" stroke-width="1.2" stroke-linecap="round" />
        </svg>
    )
}
const OrganReport = ({ }) => {
    return (
        <div>
            <div class="card">
                <div class="card-header" id="headingOne">
                    <h5 class="mb-0">
                        <button class="btn btn-link" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                            Collapsible Group Item #1
                        </button>
                    </h5>
                    <div>
                        Lorem cjvbjbfjv jfbwjk jkfbej ojfeqf edjf jfebqw jfbqj kjfbkjqew jwqfb
                    </div>
                </div>

                <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordion">
                    <div class="card-body">
                        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
                    </div>
                </div>
            </div>
        </div>
    );
};

const OrganReport1 = ({ totalParameter, outOfRange, parameterResult, reportName, lastResultDate, secondLastTestResultDate }) => {
    return (
        <div>
            <Header totalParameter={totalParameter} outOfRange={outOfRange} reportName={reportName} />
            <div style={{ height: "2px", backgroundColor: "#EDF2F9" }}></div>
            <ParameterHeading lastResultDate={lastResultDate} secondLastTestResultDate={secondLastTestResultDate} />
            {parameterResult.map((result) => (
                <Parameter parameterResult={result} />
            ))}
        </div>
    )
}

{/* <div>
    <div>
        {icons[bodyTest]}
    </div>
    <div>
        <div>
            {bodyTest}
        </div>
        <div>
            {outOfRange}/{total} Need Attention
        </div>
    </div>
</div> */}

const Header = ({ totalParameter, outOfRange, reportName }) => {
    const happyFlow = outOfRange === 0;
    return (
        <div
            style={{
                display: "flex",
                padding: "10px"
            }}
        >
            <div style={{ marginRight: "8px" }}>
                {icons[reportName]}
            </div>
            <div>
                <div style={{ fontWeight: "600", fontSize: "14px" }}>{reportName} Monitoring</div>
                <div style={{ fontSize: "12px", display: "flex", alignItems: "center", gap: "4px", marginTop: "5px", fontWeight: "600", color: "#4F585E" }}>
                    <span
                        style={{
                            color: happyFlow ? "#45A081" : "#CC4C4E"
                        }}
                    > {happyFlow ? totalParameter : outOfRange} </span>
                    {"/"}
                    <span> {totalParameter} </span>
                    <span> {happyFlow ? " Needs Attention" : " All Looks Good"}</span>
                    {happyFlow ? emojis["happy"] : emojis["sad"]}
                    <div
                        style={{
                            textDecoration: "underline",
                            marginLeft: "auto",
                            cursor: "pointer",
                            color: "var(--Colour-Palette-Neutral-Dark-N400, #6E787E)",
                            fontWeight: "500"
                        }}
                    >
                        View All
                    </div>
                </div>
            </div>
        </div>
    )
}

const Parameter = ({ parameterResult }) => {
    const { name, increased,
        isGood,
        minLimit,
        maxLimit,
        unit,
        lastResultValue,
        latestResultValue } = parameterResult;
    const color = isGood ? "green" : "red";
    const changedBy = lastResultValue - latestResultValue;
    const graphHeight = 90;

    const calculateHeight = (height) => {
        if (height < minLimit) return 20;
        if (height > maxLimit) return 70;
        if (height === minLimit) return 30;
        if (height === maxLimit) return 60;
        return 50;
    }

    const calculateBackground = (value) => {
        if (value < minLimit || value > maxLimit)
            return "#CC4C4E"
        else
            return "#45A081";
    }

    return (
        <div style={{
            display: "flex",
            padding: "10px 12px"
        }}>
            <div style={{flex: 1}}>
                <div
                    style={{
                        fontFamily: "Inter",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: 400
                    }}
                > {name} </div>
                <div style={{
                    color: "var(--Colour-Palette-Neutral-Dark-N800, #30363C)",
                    fontSize: "10px",
                    fontWeight: 400
                }}>
                    {increased ? <IncreaseIcon color={color} /> : <DecreaseIcon color={color} />}
                    <span style={{marginLeft: "5px"}}>
                        {increased ? "Increased by" : "Decreased by"} {Math.abs(changedBy).toFixed(2)} {unit}
                    </span>
                </div>
                <div style={{
                    fontSize: "10px",
                    fontStyle: "normal",
                    fontWeight: 400,
                    color: "#6E787E"
                }}>
                    Range {minLimit} - {maxLimit} {unit}
                </div>
            </div>
            <div style={{
                width: "35%",
                display: "flex",
                flexDirection: "column",
                height: graphHeight,
                background: "#F9FCFF",
                boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset",
                position: "relative"
            }}
            >
                <div style={{flex: 1}}> </div>
                <div style={{ flex: 1, background: "#E7FFF2" }}> </div>
                <div style={{ flex: 1 }}> </div>
                <div
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        justifyContent: "space-around"
                    }}
                >
                    <div style={{width: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-end"}}>
                        <div style={{
                            fontSize: "10px",
                            fontWeight: 500
                        }}> {lastResultValue}</div>
                        <div style={{ height: calculateHeight(lastResultValue), background: calculateBackground(lastResultValue)  }}> </div>
                    </div>
                    <div style={{ width: "20px", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                        <div style={{
                            fontSize: "10px",
                            fontWeight: 500
                        }}> {latestResultValue}</div>
                        <div style={{ height: calculateHeight(latestResultValue), background: calculateBackground(latestResultValue) }}> </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
const ParameterHeading = ({ lastResultDate, secondLastTestResultDate }) => {
    return (
        <div style={{
            fontWeight: "700",
            fontSize: "8px",
            textTransform: "uppercase",
            display: "flex",
            justifyContent: "space-between",
            padding: "10px 12px"
        }}>
            <div>
                Parameters
            </div>
            <div style={{
                width: "35%",
                display: "flex",
                justifyContent: "space-around"
            }}>
                <span> {secondLastTestResultDate.split(",")[0]} </span>
                <span> {lastResultDate.split(",")[0]} </span>
            </div>
        </div>
    )
}

const reports = {

}

const parameterResult = [{
    name: "Fasting Blood Sugar(Glucose)",
    increased: true,
    isGood: false,
    minLimit: 70,
    maxLimit: 99,
    unit: "mg/dl",
    lastResultValue: 97,
    latestResultValue: 102.6
}]
const lastResultDate = "16 March, 2023", secondLastTestResultDate = "12 Jan, 2023";
const OrganReports = () => (
    <OrganReport1 totalParameter={32} outOfRange={2} parameterResult={parameterResult} reportName="Diabetes" lastResultDate={lastResultDate} secondLastTestResultDate={secondLastTestResultDate} />
)
export default OrganReports;
