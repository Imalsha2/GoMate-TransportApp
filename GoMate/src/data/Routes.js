export const ALL_ROUTES = {
    "routes": [
        {
          "id": "SL001",
          "name": "Colombo → Kandy",
          "type": "Bus",
          "status": "Active",
          "image": "https://picsum.photos/600/400?random=1",
          "duration": "3h 30m",
          "stops": ["Colombo Fort", "Kirulapone", "Kadawatha", "Mawanella", "Peradeniya", "Kandy"],
          "schedule": ["06:00 AM", "08:30 AM", "11:00 AM", "01:30 PM", "04:00 PM"]
        },
        {
          "id": "SL002",
          "name": "Colombo → Galle",
          "type": "Train",
          "status": "Active",
          "image": "https://picsum.photos/600/400?random=2",
          "duration": "2h 15m",
          "stops": ["Colombo Fort", "Panadura", "Kalutara South", "Bentota", "Hikkaduwa", "Galle"],
          "schedule": ["05:30 AM", "08:00 AM", "11:00 AM", "02:30 PM", "06:00 PM"]
        },
        {
          "id": "SL003",
          "name": "Colombo → Negombo",
          "type": "Bus",
          "status": "Popular",
          "image": "https://picsum.photos/600/400?random=3",
          "duration": "1h 10m",
          "stops": ["Colombo Fort", "Borella", "Kiribathgoda", "Katunayake", "Negombo"],
          "schedule": ["07:00 AM", "09:30 AM", "12:00 PM", "03:00 PM", "05:30 PM"]
        },
        {
          "id": "SL004",
          "name": "Colombo → Jaffna",
          "type": "Train",
          "status": "Upcoming",
          "image": "https://picsum.photos/600/400?random=4",
          "duration": "7h 45m",
          "stops": ["Colombo Fort", "Anuradhapura", "Vavuniya", "Jaffna"],
          "schedule": ["04:00 AM", "10:00 AM", "04:00 PM"]
        },
        {
          "id": "SL005",
          "name": "Kandy → Nuwara Eliya (via Nanu Oya)",
          "type": "Train",
          "status": "Active",
          "image": "https://picsum.photos/600/400?random=5",
          "duration": "4h 20m",
          "stops": ["Kandy", "Peradeniya", "Gampola", "Nawalapitiya", "Nanu Oya", "Nuwara Eliya"],
          "schedule": ["06:15 AM", "09:45 AM", "01:15 PM"]
        },
        {
          "id": "SL006",
          "name": "Colombo → Matara (Coastal Line)",
          "type": "Train",
          "status": "Active",
          "image": "https://picsum.photos/600/400?random=6",
          "duration": "2h 50m",
          "stops": ["Colombo Fort", "Panadura", "Kalutara", "Aluthgama", "Bentota", "Hikkaduwa", "Galle", "Matara"],
          "schedule": ["05:00 AM", "08:00 AM", "11:30 AM", "03:00 PM"]
        },
        {
          "id": "SL007",
          "name": "Colombo Airport Shuttle",
          "type": "Shuttle",
          "status": "Active",
          "image": "https://picsum.photos/600/400?random=7",
          "duration": "40m",
          "stops": ["Colombo Fort", "Katunayake", "Bandaranaike International Airport"],
          "schedule": ["Every 30 minutes"]
        },
        {
          "id": "SL008",
          "name": "Colombo → Trincomalee",
          "type": "Bus",
          "status": "Active",
          "image": "https://picsum.photos/600/400?random=8",
          "duration": "6h 10m",
          "stops": ["Colombo Fort", "Kurunegala", "Dambulla", "Habarana", "Trincomalee"],
          "schedule": ["06:00 AM", "12:00 PM", "06:00 PM"]
        },
        {
          "id": "SL009",
          "name": "Colombo → Sigiriya / Dambulla (Tourist Route)",
          "type": "Bus",
          "status": "Popular",
          "image": "https://picsum.photos/600/400?random=9",
          "duration": "4h 0m",
          "stops": ["Colombo Fort", "Negombo", "Dambulla", "Sigiriya"],
          "schedule": ["07:00 AM", "10:00 AM", "02:00 PM"]
        },
        {
          "id": "SL010",
          "name": "Galle City Route",
          "type": "City Bus",
          "status": "Active",
          "image": "https://picsum.photos/600/400?random=10",
          "duration": "30m (typical)",
          "stops": ["Galle Fort", "Unawatuna", "Hikkaduwa"],
          "schedule": ["Frequent service"]
        },
        {
          "id": "FLIGHT001",
          "name": "Colombo (CMB) → Dubai (DXB)",
          "type": "Flight",
          "status": "Active",
          "image": "https://images.unsplash.com/photo-1474302770737-173ee21bab63",
          "duration": "4h 35m",
          "stops": ["Bandaranaike International Airport", "Dubai International Airport"],
          "schedule": ["02:00 AM", "08:30 AM", "07:00 PM"]
        },
        {
          "id": "FLIGHT002",
          "name": "Colombo (CMB) → Singapore (SIN)",
          "type": "Flight",
          "status": "Popular",
          "image":  "https://images.unsplash.com/photo-1506102383123-c8ef1e872756",
          "duration": "3h 45m",
          "stops": ["Bandaranaike International Airport", "Singapore Changi Airport"],
          "schedule": ["06:30 AM", "12:00 PM", "11:45 PM"]
        },
        {
          "id": "FLIGHT003",
          "name": "Colombo (CMB) → London Heathrow (LHR)",
          "type": "Flight",
          "status": "Active",
          "image": "https://images.unsplash.com/photo-1500835556837-99ac94a94552",
          "duration": "11h 10m",
          "stops": ["Bandaranaike International Airport", "London Heathrow Airport"],
          "schedule": ["10:00 AM", "08:00 PM"]
        },
        {
          "id": "FLIGHT004",
          "name": "Colombo (CMB) → Maldives (MLE)",
          "type": "Flight",
          "status": "Upcoming",
          "image": "https://images.unsplash.com/photo-1497493292307-31c376b6e479",
          "duration": "1h 25m",
          "stops": ["Bandaranaike International Airport", "Velana International Airport"],
          "schedule": ["09:00 AM", "03:00 PM", "08:00 PM"]
        },
        {
          "id": "FLIGHT005",
          "name": "Colombo (CMB) → Doha (DOH)",
          "type": "Flight",
          "status": "Active",
          "image": "https://images.unsplash.com/photo-1474302770737-173ee21bab63",
          "duration": "5h 00m",
          "stops": ["Bandaranaike International Airport", "Hamad International Airport"],
          "schedule": ["02:00 AM", "09:00 AM", "04:00 PM"]
        }
    ]
};