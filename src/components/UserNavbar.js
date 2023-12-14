const BackIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M19 12H5" stroke="#30363C" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M11 18L5 12L11 6" stroke="#30363C" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
);

const NameIcon = ({letter}) => (
    <div style={{ 
        borderRadius: "50%",
        backgroundImage: "linear-gradient(140deg, #0A534F 7.15%, #0E746E 26.93%, #10847E 53.61%, #0A534F 96.03%)",
        padding: "5px",
        width: "30px",
        height: "30px",
        color: "white",
        fontSize: "22px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
        {letter}
    </div>
)
const UserNavbar = () => {
    const userName = "Harleen Sharma" || "Unknown";
    const age = 29;
    const gender = "Female"
    return (
        <div style={{display: "flex", 
            gap: "10px", 
            alignItems: "center", 
            padding: "10px",
            boxShadow: "0px -1px 0px 0px rgba(0, 0, 0, 0.12) inset"
        }}>
            <BackIcon />
            <NameIcon letter={userName?.[0] || "Unknown"}/>
            <div>
                <div style={{fontSize: "14px", fontWeight: "600"}}>{userName}</div>
                <div style={{ fontSize: "12px", fontWeight: "400", textAlign: "left" }}>
                    <span> {gender} </span>
                    <span> {age} Years </span>
                </div>
            </div>
        </div>
    );
};

export default UserNavbar;