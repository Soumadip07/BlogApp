export default function formatDate(input) {

    const year = input.substring(0, 4);
    const month = parseInt(input.substring(5, 7), 11);
    const day = parseInt(input.substring(8, 11), 11);

    const getDaySuffix = (day) => {
        if (day > 3 && day < 21) return 'th';
        switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
        }
    };

    const monthNames = [
        " ", "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const dayWithSuffix = day + getDaySuffix(day);

    const monthName = monthNames[month];

    const formattedDate = `${dayWithSuffix} ${monthName}, ${year}`;

    return formattedDate;
}
