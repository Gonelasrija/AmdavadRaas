import { GarbaEvent, CommunityReview, SongPollOption } from '../types';

export const NAVRATRI_NIGHTS = [
  { night: 1, date: '03 Oct', dayNum: '03', tithi: 'Pratipada', color: 'Yellow', colorHex: '#FBBF24', goddess: 'Maa Shailputri', dressAdvice: 'Bright Golden Yellow or Mustard Chaniya Choli / Kediyu' },
  { night: 2, date: '04 Oct', dayNum: '04', tithi: 'Dwitiya', color: 'Green', colorHex: '#10B981', goddess: 'Maa Brahmacharini', dressAdvice: 'Parrot or Forest Green Bandhani with Mirrorwork' },
  { night: 3, date: '05 Oct', dayNum: '05', tithi: 'Tritiya', color: 'Grey', colorHex: '#9CA3AF', goddess: 'Maa Chandraghanta', dressAdvice: 'Silver Oxidized Jewelry & Charcoal/Slate Grey Silks' },
  { night: 4, date: '06 Oct', dayNum: '06', tithi: 'Chaturthi', color: 'Orange', colorHex: '#F97316', goddess: 'Maa Kushmanda', dressAdvice: 'Deep Marigold Orange Kutchhi Rabari Embroidery' },
  { night: 5, date: '07 Oct', dayNum: '07', tithi: 'Panchami', color: 'White', colorHex: '#F3F4F6', goddess: 'Maa Skandamata', dressAdvice: 'Pristine White or Cream Chaniya Choli with Colorful Threadwork' },
  { night: 6, date: '08 Oct', dayNum: '08', tithi: 'Shashti', color: 'Red', colorHex: '#EF4444', goddess: 'Maa Katyayani', dressAdvice: 'Royal Kumkum Red Patola or Bandhani with Golden Zari' },
  { night: 7, date: '09 Oct', dayNum: '09', tithi: 'Saptami', color: 'Royal Blue', colorHex: '#2563EB', goddess: 'Maa Kaalratri', dressAdvice: 'Regal Indigo & Royal Blue Kathiyawadi Choli' },
  { night: 8, date: '10 Oct', dayNum: '10', tithi: 'Ashtami', color: 'Pink', colorHex: '#EC4899', goddess: 'Maa Mahagauri', dressAdvice: 'Rani Pink & Fuchsia with Heavy Ghungroo and Abha Mirror' },
  { night: 9, date: '11 Oct', dayNum: '11', tithi: 'Navami', color: 'Purple', colorHex: '#8B5CF6', goddess: 'Maa Siddhidatri', dressAdvice: 'Grand Midnight Violet with Multi-color Gamthi borders' },
];

export const GARBA_EVENTS: GarbaEvent[] = [
  {
    id: 'ymca-mandli',
    title: 'Mandli Garba 2025',
    sansthaName: 'Mandli Cultural Trust & YMCA',
    venueName: 'YMCA International Club',
    city: 'Ahmedabad',
    area: 'SG Highway',
    fullAddress: 'SG Highway, Near Sarkhej-Gandhinagar Cross, Bodakdev, Ahmedabad - 380054',
    coordinates: [23.0125, 72.5034],
    googleMapsQuery: 'YMCA+International+Club+SG+Highway+Ahmedabad',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAjDpnBLFqe2OyyL27USMlVj50pRbd3wqLLFYyMDapag62Vf2DhKWYv1J2youkRTD-wrnJO3N4nS9pqXRZV-eGPsSSwtKO0_Oa-cjN38lhL8W7eIXNwSZkwDRXh_u5XIGUjyI9PFw5CStHWGczwbhjB9E2UIkR2rn3_GIrnNTJGmUn4X2fDDSbiL-2WYCKV2YWLOlJn1mRxONOTQO4Szvb8DmLbZ8LGmipLVsSxBGKW2d4m0goArObd',
    thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBpTIHO7Hl4rCgsOtWXip6kjDS8KL4ROnnT1C_mw_Pcv5RO_cPpwstc0skunZrjnEUgxE48XNmkIl4qHeIsk_YCmjcP-ucAPmo42KL7vxWtYHxsEfiScUi1pakzZU26BPpOPdSRMCXsdhpulK8bxsUuiDU4ePfUIQ9yOGMXKvOECmyTdlz5vxU0AiHC93_Yfr5HWv4-LqEKvg6MBNCXpg9jAaUQnCf__lSMouC_d8nUlH5ThtEJnIAC',
    type: 'Party Plot / Club',
    rating: 4.9,
    reviewsCount: 3420,
    headliners: ['Aditya Gadhvi Live', 'Folk Symphony Orchestra'],
    headlinerPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCI5NMv3hqWuY3n9EV1kSPi9KBlSSHN2m-CRZCKodIQD4Li-Jxp-xAh3l7ai5pLnfd4jIiURIIwNG35IK3n2rtWFsRZJ3n-kW-9r_aYNuZFuZBll7fYwdTHfMwTkorHKIWULIRTOc_NnZHd62Z2G9Fxay2YxJ9_pUObdNsTm75YlYa34pBNP3cXlQLdEIS1ReRpH9_IrB3asMfbRD9Md8fShcY1UJk558k_Ve6svovsuz8mkUI2x58p',
    specialGuest: 'Geeta Rabari (Special Kutchhi Duha Duet)',
    specialGuestPhoto: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDTocI9vjcMpWb0yS7YNoWSOixXwGo1B1DyFZWeqwyMZVZEzHIbtRhrbjgyus1LwukFGWoP0glE_2yaepbW6hUCUCjSrSqWH91vJoREvVkj2TErw-oeM0msCRKGiJK-J_oH5eP0CL5BLB6m6tAi-yxoES8YoPfB5_prS7gqSBptnaXrzWlnL70SLHyfh_cyqfgBslqmKqIeryprOsbn-oGrSUh9VVR9MTyA_MW-TvZLwdUU8P0NjBwA',
    themeTitle: 'Kutchhi Mirror & Bandhani Theme',
    themeDescription: 'Authentic desert folk aesthetic with real copper-backed mirror embroidery, vegetable dye bandhani odhanis, and warm ambient lantern lighting under 100-foot dome structures.',
    dressCodeTitle: 'Kutchhi Mirror & Traditional Rabari',
    dressCodeWomen: 'Strictly traditional Kutchhi or Rabari embroidered 16-kali / 32-kali Chaniya Choli with heavy dupatta, ornate silver oxidized choker, mathapatti, and kangan. Jeans or western footwear not permitted.',
    dressCodeMen: 'Hand-stitched authentic Kediyu with traditional cotton Chorno/Dhoti, Gujarati Safa/Pagdi, and ethnic mojari or bare feet on rolled soft sand.',
    dressCodeStrictness: 'Strictly Enforced',
    groundSurface: 'Soft Red Sand (Reti)',
    capacityPercentage: 76,
    checkedInDancers: 2840,
    decibels: 98,
    gateStatus: 'Gate 1: Fast Moving · Main Ring: Lively & Full',
    startingPrice: 699,
    dholStartTime: '08:30 PM',
    mahaAartiTime: '12:00 AM Midnight',
    gatesOpenTime: '07:15 PM',
    participatingNights: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isSpotlight: true,
    passTiers: [
      {
        id: 'ymca-single',
        name: 'Early Bird Single Dancer',
        badge: 'Instant M-Pass',
        description: 'Valid for 1 Dancer (Male/Female) with Red Ring access',
        price: 699,
        available: true,
        perks: ['Red Ring entry', '1 complimentary Kutchi chaas', 'RFID wristband']
      },
      {
        id: 'ymca-couple',
        name: 'Couple Regular Pass',
        badge: 'Selling Fast',
        description: 'Valid for 1 Female + 1 Male entry together via fast-track Gate 2',
        price: 1199,
        available: true,
        perks: ['Gate 2 Fast-Track entry', 'Couple seating lounge access', 'Complimentary bottled water']
      },
      {
        id: 'ymca-season-vip',
        name: 'Season 9-Day VIP Pass',
        badge: 'VIP Gold Lounge',
        description: 'All 9 Nights unlimited access with Singer Meet & Greet slot',
        price: 4499,
        available: true,
        perks: ['All 9 nights access', 'Reserved P1 Valet parking tag', 'Singer Meet & Greet', 'Air-conditioned VIP lounge']
      }
    ],
    parkingLots: [
      {
        id: 'ymca-p1',
        name: 'VIP Ground Entry Lot A',
        code: 'P1',
        type: 'VIP',
        totalSpots: 100,
        availableSpots: 8,
        fillPercentage: 92,
        statusText: 'Only 8 spots left · High congestion',
        fastEntrance: true,
        price: 250
      },
      {
        id: 'ymca-p2',
        name: 'General Public Gate 3 (East Quad)',
        code: 'P2',
        type: 'General',
        totalSpots: 300,
        availableSpots: 140,
        fillPercentage: 53,
        statusText: '140 spots left · Fast entrance',
        fastEntrance: true,
        price: 100
      },
      {
        id: 'ymca-p3',
        name: 'Overflow Valet (Iscon Crossover)',
        code: 'P3',
        type: 'Valet & Shuttle',
        totalSpots: 450,
        availableSpots: 310,
        fillPercentage: 31,
        statusText: 'Ample Space · Free electric golf buggy drop',
        fastEntrance: false,
        price: 150
      },
      {
        id: 'ymca-2w',
        name: 'Two-Wheeler Dedicated Stand (Gate 4)',
        code: '2W',
        type: 'Two-Wheeler',
        totalSpots: 600,
        availableSpots: 240,
        fillPercentage: 60,
        statusText: 'Open & Free for all registered passholders',
        fastEntrance: true,
        price: 0
      }
    ],
    nearbyFreeParking: [
      {
        id: 'ymca-free-1',
        name: 'AMC Public Ground & Service Lane (Near Iskcon Crossroad)',
        distance: '280m',
        walkTime: '3 min walk',
        capacityText: 'Approx 180 cars · 300 two-wheelers',
        locationHint: 'Behind Iskcon Temple service lane, wide open municipal designated parking bay',
        safetyNote: 'Ahmedabad Traffic Police booth & bright high-mast floodlights active till 2:30 AM',
        googleMapsQuery: 'Iskcon+Cross+Road+Ahmedabad+Parking',
        isOfficialTieUp: true
      },
      {
        id: 'ymca-free-2',
        name: 'Bodakdev Municipal Community Hall Ground',
        distance: '450m',
        walkTime: '5 min walk',
        capacityText: 'Approx 120 cars',
        locationHint: 'Opposite Judges Bungalow extension road, paved open municipal lot',
        safetyNote: 'Dedicated AMC warden on duty, well-lit pedestrian footpath straight to YMCA Gate 2',
        googleMapsQuery: 'Bodakdev+Community+Hall+Ahmedabad'
      }
    ],
    setlist: [
      { id: 1, title: 'Khalasi (Gotilo)', artist: 'Aditya Gadhvi', round: 'Peak Raas Hour (Round 3)', duration: '8:45', vibe: 'High-octane crescendo' },
      { id: 2, title: 'Maha Hetvali Re', artist: 'Aditya Gadhvi & Troupe', round: 'Synchronized Dodhiya (Round 2)', duration: '11:20', vibe: 'Traditional Dodhiya rhythm' },
      { id: 3, title: 'Char Bangdi Vadi Gadi', artist: 'Geeta Rabari', round: 'Speedy 3-Taali (Round 4)', duration: '7:15', vibe: 'Fast paced circular energy' },
      { id: 4, title: 'Mor Bani Thanghat Kare', artist: 'Aditya Gadhvi & Geeta Rabari', round: 'Grand Aarti Climax', duration: '9:30', vibe: 'Midnight Aarti reverent vibe' }
    ]
  },
  {
    id: 'karnavati-suvarn',
    title: 'Suvarn Navratri Mahotsav',
    sansthaName: 'Karnavati Club Limited',
    venueName: 'Karnavati Club Arena',
    city: 'Ahmedabad',
    area: 'Bodakdev',
    fullAddress: 'SG Highway, Bodakdev, Satellite Area, Ahmedabad - 380058',
    coordinates: [23.0238, 72.5076],
    googleMapsQuery: 'Karnavati+Club+SG+Highway+Ahmedabad',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCTliJELjbaE_ouJou1mbqry3bnXRfrQG7OaPTBHSyc6Zi6UYB2H9ZdXvHqMc2q573v9sEVKGDW_SXXBSXwFj7GHxKvxRJoQlSVibjLLJ37fZEC_Z2nwnHcy9wE5-hDwLwAqEeeRPHEo9Rb-NR8DZ9SgZQp_sA8XnlD77m3rR_Qc-ayiNeMyLtBXTeNDU3mpHwOyq1s9KeqM9DMmuNmXAkgav0L6sG-wdgABT3KGEgxdxWuMHdp5-7F',
    thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD4bqxsaERiaU9JfTkGFp0CrONidMAcPm48R0dd-KbydzyugeYsIat7bZx5fIWI3jv78TXbHlGfAgrXo49cvuIB8Z10ohfDM-iK92wzQBD0Ev7mLMucah_wPiIow0TUYbblEyPX5PwqsO20YyoJP5lHJ0JJyvbYsFnbiZbbvdmgkYUCuPEVROwc6x9MkbcEg4s27GuA7BOQ1RRPggP_HW2wAXtgoMn6cwwEWd79t_bZPLQdr2Ni6p0I',
    type: 'Party Plot / Club',
    rating: 4.9,
    reviewsCount: 1240,
    headliners: ['Kinjal Dave Live', 'Bhoomi Trivedi'],
    themeTitle: 'Royal Kathiyawadi Heritage & Mirror Work',
    themeDescription: 'Regal golden canopy draping with traditional Saurashtra brass oil lamps, concentric 4-circle dancing rings, and pure Gujarati acoustic dhol beats.',
    dressCodeTitle: 'Royal Kathiyawadi & Zari Ghagra',
    dressCodeWomen: 'Authentic Kathiyawadi flair Chaniya Choli with mirrorwork border, traditional Kamarbandh / Kandora, and embroidered Odhani pinned in Gujarati front-pallu style.',
    dressCodeMen: 'Short Kediyu embroidered with peacock motifs, flared Chorno or Jodhpur breeches, and traditional red pagdi.',
    dressCodeStrictness: 'Strictly Enforced',
    groundSurface: 'Spring Wood',
    capacityPercentage: 82,
    checkedInDancers: 3120,
    decibels: 101,
    gateStatus: 'Gate 2: Valet line moving · Main Arena: 82% Full',
    startingPrice: 899,
    dholStartTime: '08:30 PM',
    mahaAartiTime: '12:00 AM',
    gatesOpenTime: '07:30 PM',
    participatingNights: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    passTiers: [
      {
        id: 'karnavati-single',
        name: 'Single Dancer Gold Tier',
        badge: 'Few Passes Left',
        description: 'Entry to center arena wood-floor dance rings',
        price: 899,
        available: true,
        perks: ['Center wood ring access', 'Red carpet entrance', 'Live stream access']
      },
      {
        id: 'karnavati-couple',
        name: 'Suvarn Couple Arena Pass',
        badge: 'Popular',
        description: 'Priority lane for 1 Male + 1 Female',
        price: 1599,
        available: true,
        perks: ['Fast track turnstile', 'VIP club lawn lounge', '2 welcome beverages']
      }
    ],
    parkingLots: [
      {
        id: 'karnavati-p1',
        name: 'Basement Multi-Level Valet (Members & VIP)',
        code: 'P1',
        type: 'VIP',
        totalSpots: 200,
        availableSpots: 12,
        fillPercentage: 94,
        statusText: 'Redirecting to P3 flyover bay',
        fastEntrance: true,
        price: 300
      },
      {
        id: 'karnavati-p2',
        name: 'Club South Lawn Gate 1',
        code: 'P2',
        type: 'General',
        totalSpots: 350,
        availableSpots: 85,
        fillPercentage: 75,
        statusText: 'Moderate rush · 85 slots free',
        fastEntrance: true,
        price: 150
      },
      {
        id: 'karnavati-p3',
        name: 'Under-Flyover Bodakdev Overflow Lot',
        code: 'P3',
        type: 'Valet & Shuttle',
        totalSpots: 500,
        availableSpots: 340,
        fillPercentage: 32,
        statusText: '340 slots free · 5 min walk / golf cart',
        fastEntrance: false,
        price: 100
      }
    ],
    nearbyFreeParking: [
      {
        id: 'karnavati-free-1',
        name: 'Pakwan Crossroad Service Bay & AUDA Garden Verge',
        distance: '350m',
        walkTime: '4 min walk',
        capacityText: 'Approx 150 vehicles',
        locationHint: 'Under the flyover service road towards Judges Bungalow road',
        safetyNote: 'Designated 100% free night parking with Amdavad Police vigil & clear walking sidewalk',
        googleMapsQuery: 'Pakwan+Cross+Road+Ahmedabad+Parking',
        isOfficialTieUp: true
      },
      {
        id: 'karnavati-free-2',
        name: 'Sindhu Bhavan Entry Public Open Verge',
        distance: '500m',
        walkTime: '6 min walk',
        capacityText: 'Approx 90 cars',
        locationHint: 'Left verge after SBR entry circle, wide paved shoulder',
        safetyNote: 'Continuous pedestrian crowd movement and high visibility',
        googleMapsQuery: 'Sindhu+Bhavan+Marg+Ahmedabad+Free+Parking'
      }
    ],
    setlist: [
      { id: 1, title: 'Char Char Bangadi Vadi Gadi', artist: 'Kinjal Dave', round: 'Round 1 (Non-stop)', duration: '14:20', vibe: 'Folk anthem peak' },
      { id: 2, title: 'Chogada Tara', artist: 'Bhoomi Trivedi', round: 'Round 2', duration: '9:10', vibe: 'Upbeat 3-taali' },
      { id: 3, title: 'Lal Peeli Akhiyaan', artist: 'Kinjal & Bhoomi', round: 'Midnight Aarti & Raas', duration: '12:00', vibe: 'Traditional folk fusion' }
    ]
  },
  {
    id: 'adani-shantigram',
    title: 'United Way of Amdavad',
    sansthaName: 'Shantigram Cultural Foundation',
    venueName: 'The Belvedere Golf Club, Adani Shantigram',
    city: 'Ahmedabad',
    area: 'Vaishnodevi Circle',
    fullAddress: 'Near Vaishnodevi Circle, SG Highway Extension, Ahmedabad - 382421',
    coordinates: [23.1423, 72.5518],
    googleMapsQuery: 'Adani+Shantigram+Ahmedabad',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFDw6YvRWOsVNYcn9yIvABudIpQ_JTUYTjWGqr9E2tIZh82BwXEL-hKrMsfYzSFnmofSMz8Si062J8XcvyJ1ksXxF7n_OmCJZTIt5oSY2kVkMF9cgej16EGzaRxKr4SkmJw0LkIJANM5rz7oX6TaDPFJdVujx0rWsdohrNsLNOlNPqFdUy2xairdErPAFZvayb19NFbd1fceUbx9uaJneEZsRzfTKP0UXS95XpeHiP0bEW6Bvu8ahG',
    thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBFDw6YvRWOsVNYcn9yIvABudIpQ_JTUYTjWGqr9E2tIZh82BwXEL-hKrMsfYzSFnmofSMz8Si062J8XcvyJ1ksXxF7n_OmCJZTIt5oSY2kVkMF9cgej16EGzaRxKr4SkmJw0LkIJANM5rz7oX6TaDPFJdVujx0rWsdohrNsLNOlNPqFdUy2xairdErPAFZvayb19NFbd1fceUbx9uaJneEZsRzfTKP0UXS95XpeHiP0bEW6Bvu8ahG',
    type: 'Party Plot / Club',
    rating: 4.8,
    reviewsCount: 2450,
    headliners: ['Atul Purohit Live', 'The Baroda Mandvi Symphony'],
    themeTitle: 'Authentic Vadodara-style Mandvi Raas',
    themeDescription: 'Massive single concentric ring where 30,000+ khelaiyas dance in unbroken harmony around a central towering golden temple mandvi. Pure devotional serenity with zero Bollywood songs.',
    dressCodeTitle: 'Traditional Pure Cotton & Silk',
    dressCodeWomen: 'Full flare traditional Choli with Gujarati or Kathiyawadi print, floral fresh gajra in hair, flat mojari or bare feet on plush turf.',
    dressCodeMen: 'White or pastel colored traditional cotton Kurta Kediyu, Gujarati safa, and cotton dhoti.',
    dressCodeStrictness: 'Strictly Enforced',
    groundSurface: 'Lush Green Turf',
    capacityPercentage: 64,
    checkedInDancers: 4890,
    decibels: 92,
    gateStatus: 'All 4 Gates Flowing Smoothly · Ample Ring Space',
    startingPrice: 499,
    dholStartTime: '08:00 PM',
    mahaAartiTime: '12:00 AM',
    gatesOpenTime: '07:00 PM',
    participatingNights: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    passTiers: [
      {
        id: 'shantigram-female',
        name: 'Female Devotee Pass',
        badge: 'Best Value',
        description: 'Full lawn access for single female dancer',
        price: 499,
        available: true,
        perks: ['Grand Mandvi circle entry', 'Free drinking water refill stations']
      },
      {
        id: 'shantigram-couple',
        name: 'Couple Mandvi Season Pass',
        badge: 'Season Access',
        description: 'Access for couple for all 9 classical nights',
        price: 2999,
        available: true,
        perks: ['Full 9 nights entry', 'Dedicated parking bay tag', 'Express check-in']
      }
    ],
    parkingLots: [
      {
        id: 'shantigram-p1',
        name: 'Belvedere Golf Clubhouse Bay',
        code: 'P1',
        type: 'VIP',
        totalSpots: 300,
        availableSpots: 120,
        fillPercentage: 60,
        statusText: '120 spots left · Clubhouse entry',
        fastEntrance: true,
        price: 200
      },
      {
        id: 'shantigram-p2',
        name: 'Grand South Lawn Parking (Ring Road side)',
        code: 'P2',
        type: 'General',
        totalSpots: 1200,
        availableSpots: 620,
        fillPercentage: 48,
        statusText: '620 spots free · Huge open ground',
        fastEntrance: true,
        price: 50
      },
      {
        id: 'shantigram-2w',
        name: 'Vaishnodevi Circle Gate 2W Lot',
        code: '2W',
        type: 'Two-Wheeler',
        totalSpots: 800,
        availableSpots: 510,
        fillPercentage: 36,
        statusText: 'Free & wide motorcycle bays',
        fastEntrance: true,
        price: 0
      }
    ],
    nearbyFreeParking: [
      {
        id: 'shantigram-free-1',
        name: 'Vaishnodevi Circle Municipal Service Grounds',
        distance: '400m',
        walkTime: '5 min walk',
        capacityText: 'Approx 350 vehicles (Cars & 2W)',
        locationHint: 'Spacious open grounds north of Vaishnodevi temple circle with direct shuttle link',
        safetyNote: 'Organized by Amdavad Traffic Department with high-mast lighting and patrol guards',
        googleMapsQuery: 'Vaishnodevi+Circle+Ahmedabad+Parking',
        isOfficialTieUp: true
      }
    ],
    setlist: [
      { id: 1, title: 'Tara Vina Shyam Mane Ekaldun Lage', artist: 'Atul Purohit', round: 'Opening Devotion', duration: '18:00', vibe: 'Classical spiritual trance' },
      { id: 2, title: 'Aavi Aaso Ni Raat', artist: 'Atul Purohit', round: 'Dodhiya Circle', duration: '15:30', vibe: 'Concentric wave rhythm' },
      { id: 3, title: 'Jay Adhya Shakti (Maha Aarti)', artist: 'Atul Purohit & 30k Dancers', round: 'Midnight Aarti', duration: '21:00', vibe: 'Divine unison chanting' }
    ]
  },
  {
    id: 'gandhinagar-sector11',
    title: 'Gandhinagar Rajat Raas Utsav',
    sansthaName: 'Capital Garba Samiti & Gandhinagar Cultural Forum',
    venueName: 'Sector 11 Open Cultural Grounds',
    city: 'Gandhinagar',
    area: 'Sector 11 Gandhinagar',
    fullAddress: 'Near Mahatma Mandir & CH Road, Sector 11, Gandhinagar - 382011',
    coordinates: [23.2185, 72.6462],
    googleMapsQuery: 'Sector+11+Gandhinagar+Cultural+Ground',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGJlTc-jO3HR20aCPjK7WucxZkeENxRMRhD3hGrrPchnVEgOKWQ-crYnMfN36TJEf1WrYK3i7XEXTV6FviO_my92sWiaGCBEhNwm8Sti8qRuhbIn2p_9fIWaXV54vN_VzFsXGzHGP2nDYXKpriJ3c0lUDKAhdf5ZddLHpjP0nAzcBPGWv0hoUmSpQGqlNG20bz_bCtcEoVYmfwE0NGMQw_TG8BfOcfr7YLoTJjzGuy0G24YaEptioK',
    thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGJlTc-jO3HR20aCPjK7WucxZkeENxRMRhD3hGrrPchnVEgOKWQ-crYnMfN36TJEf1WrYK3i7XEXTV6FviO_my92sWiaGCBEhNwm8Sti8qRuhbIn2p_9fIWaXV54vN_VzFsXGzHGP2nDYXKpriJ3c0lUDKAhdf5ZddLHpjP0nAzcBPGWv0hoUmSpQGqlNG20bz_bCtcEoVYmfwE0NGMQw_TG8BfOcfr7YLoTJjzGuy0G24YaEptioK',
    type: 'Party Plot / Club',
    rating: 4.8,
    reviewsCount: 890,
    headliners: ['Kairavi Buch Live', 'Gandhinagar Dhol Brass Band'],
    themeTitle: 'Royal Capital Swarna Raas & Kutchi Gamthi',
    themeDescription: 'State capital flagship Navratri celebration surrounded by lush green avenues. Authentic traditional steps with dedicated family and couple circles.',
    dressCodeTitle: 'Traditional Gamthi & Bandhani',
    dressCodeWomen: 'Traditional 12-kali to 16-kali Chaniya Choli with mirror patches, ethnic silver jewelry, no jeans.',
    dressCodeMen: 'Embroidered Kurta Pyjama or Kediyu with traditional Gujarati stoles.',
    dressCodeStrictness: 'Strictly Enforced',
    groundSurface: 'Soft Red Sand (Reti)',
    capacityPercentage: 70,
    checkedInDancers: 2150,
    decibels: 95,
    gateStatus: 'Gate 1 & Gate 3 Flowing Fast · Wide Avenues',
    startingPrice: 399,
    dholStartTime: '08:30 PM',
    mahaAartiTime: '12:00 AM',
    gatesOpenTime: '07:30 PM',
    participatingNights: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    passTiers: [
      {
        id: 'gn-single',
        name: 'Single Devotee Pass',
        badge: 'Budget Friendly',
        description: 'Entry to Sector 11 main arena lawn',
        price: 399,
        available: true,
        perks: ['Open ground ring access', 'Secure bag deposit booth']
      },
      {
        id: 'gn-couple',
        name: 'Couple Entry Pass',
        badge: 'Instant QR',
        description: 'Priority couple entry lane',
        price: 699,
        available: true,
        perks: ['Fast check-in', '1 parking token included']
      }
    ],
    parkingLots: [
      {
        id: 'gn-p1',
        name: 'Sector 11 Open Helipad Parking',
        code: 'P1',
        type: 'General',
        totalSpots: 800,
        availableSpots: 430,
        fillPercentage: 46,
        statusText: '430 spots free · Extremely wide road',
        fastEntrance: true,
        price: 50
      },
      {
        id: 'gn-p2',
        name: 'CH Road VIP Bay',
        code: 'P2',
        type: 'VIP',
        totalSpots: 150,
        availableSpots: 45,
        fillPercentage: 70,
        statusText: '45 spots left',
        fastEntrance: true,
        price: 150
      }
    ],
    nearbyFreeParking: [
      {
        id: 'gn-free-1',
        name: 'Mahatma Mandir Open Public Esplanade',
        distance: '300m',
        walkTime: '4 min walk',
        capacityText: 'Approx 500+ cars & buses',
        locationHint: 'Mahatma Mandir convention perimeter road, wide tree-lined municipal bays',
        safetyNote: 'Capital Police permanent PCR van and 24/7 solar street illumination',
        googleMapsQuery: 'Mahatma+Mandir+Gandhinagar+Parking',
        isOfficialTieUp: true
      },
      {
        id: 'gn-free-2',
        name: 'Sector 11 Service Avenue Verge',
        distance: '150m',
        walkTime: '2 min walk',
        capacityText: 'Approx 150 vehicles',
        locationHint: 'Parallel service lane along Sector 11 gardens',
        safetyNote: 'Zero fees, quiet and smooth exit toward Gandhinagar Highway',
        googleMapsQuery: 'Sector+11+Gandhinagar+Free+Parking'
      }
    ],
    setlist: [
      { id: 1, title: 'Sonano Garbo Re', artist: 'Kairavi Buch', round: 'Round 1', duration: '9:40', vibe: 'Melodious traditional' },
      { id: 2, title: 'Dakla & Sanedo Fusion', artist: 'Kairavi Buch', round: 'Round 3 Fast', duration: '12:15', vibe: 'High tempo stomping' }
    ]
  },
  {
    id: 'gift-city-raas',
    title: 'GIFT City Tech & Heritage Raas',
    sansthaName: 'GIFT City Cultural League',
    venueName: 'GIFT Club Lawns & Riverside Promenade',
    city: 'Gandhinagar',
    area: 'GIFT City',
    fullAddress: 'GIFT City Boulevard, Near Riverside Park, Gandhinagar - 382355',
    coordinates: [23.1598, 72.6841],
    googleMapsQuery: 'GIFT+City+Club+Gandhinagar',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVeL6ff66uXzPnZFMl7rRtwQ7azo5GC4g312rDrfUOGEm5MNVUNx0TJwDFLCUvFo-35657rBj3aHgBGjLRfJViDcOdn0ZDusF5V-fHYVuu93clUTrZ5YmOE7G4PFhbDin3pn4xZOfM426BOYr7wPV_kNS9yaunfB5acAkzp0MXEayQjrpjZV9grhtGC2Zyb8b5LzbGwdp1CSwQK2-_7MKLtr1VxbGsHBqlX2n_sXLmk_VEdwYSVHlv',
    thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVeL6ff66uXzPnZFMl7rRtwQ7azo5GC4g312rDrfUOGEm5MNVUNx0TJwDFLCUvFo-35657rBj3aHgBGjLRfJViDcOdn0ZDusF5V-fHYVuu93clUTrZ5YmOE7G4PFhbDin3pn4xZOfM426BOYr7wPV_kNS9yaunfB5acAkzp0MXEayQjrpjZV9grhtGC2Zyb8b5LzbGwdp1CSwQK2-_7MKLtr1VxbGsHBqlX2n_sXLmk_VEdwYSVHlv',
    type: 'Party Plot / Club',
    rating: 4.7,
    reviewsCount: 650,
    headliners: ['Devang Patel & Troupe', 'Sabarmati Folk Collective'],
    themeTitle: 'Contemporary Neo-Heritage Raas',
    themeDescription: 'Modern illuminated skyscraper backdrop overlooking the tranquil Sabarmati river with state-of-the-art acoustic line arrays and clean EV parking hubs.',
    dressCodeTitle: 'Fusion Contemporary & Traditional',
    dressCodeWomen: 'Modern silhouette mirror Chaniya Choli or Indo-western lehenga with traditional dupatta and oxidized accents.',
    dressCodeMen: 'Designer Kurta with bandhgala jacket or Kediyu.',
    dressCodeStrictness: 'Traditional Preferred',
    groundSurface: 'Lush Green Turf',
    capacityPercentage: 58,
    checkedInDancers: 1820,
    decibels: 94,
    gateStatus: 'Automated Smart Turnstiles · Zero Wait Time',
    startingPrice: 599,
    dholStartTime: '08:30 PM',
    mahaAartiTime: '12:00 AM',
    gatesOpenTime: '07:30 PM',
    participatingNights: [2, 3, 4, 5, 6, 7, 8, 9],
    passTiers: [
      {
        id: 'gift-single',
        name: 'GIFT Professional Single',
        badge: 'Instant QR',
        description: 'Single pass for IT & BFSI professionals & guests',
        price: 599,
        available: true,
        perks: ['Promenade access', 'High-speed EV charging slot access']
      },
      {
        id: 'gift-couple',
        name: 'Riverside Couple Pass',
        badge: 'Fast Lane',
        description: 'Couple pass with riverside food court access',
        price: 999,
        available: true,
        perks: ['Fast check-in', '10% discount at gourmet food street']
      }
    ],
    parkingLots: [
      {
        id: 'gift-p1',
        name: 'GIFT Smart Automated Multi-Level Car Park',
        code: 'P1',
        type: 'VIP',
        totalSpots: 600,
        availableSpots: 380,
        fillPercentage: 36,
        statusText: '380 spots free · EV chargers available',
        fastEntrance: true,
        price: 100
      }
    ],
    nearbyFreeParking: [
      {
        id: 'gift-free-1',
        name: 'GIFT Promenade Outer Service Bays (Boulevard P4)',
        distance: '200m',
        walkTime: '3 min walk',
        capacityText: 'Approx 220 cars · EV chargers on site',
        locationHint: 'Adjacent to Sabarmati Riverfront promenade, dedicated zero-fee public zone',
        safetyNote: 'GIFT Smart City AI camera coverage and automated perimeter security',
        googleMapsQuery: 'GIFT+City+Boulevard+Parking',
        isOfficialTieUp: true
      }
    ],
    setlist: [
      { id: 1, title: 'Madhada Ni Mogal', artist: 'Sabarmati Troupe', round: 'Round 2', duration: '8:50', vibe: 'Rhythmic dodhiya' }
    ]
  },
  {
    id: 'sbr-aman-akash',
    title: 'Mirchi Rock N Dhol',
    sansthaName: 'Radio Mirchi & Aman Akash Plots',
    venueName: 'Aman Akash Party Plot',
    city: 'Ahmedabad',
    area: 'Sindhu Bhavan',
    fullAddress: 'Sindhu Bhavan Marg, Off SG Highway, Bodakdev, Ahmedabad - 380059',
    coordinates: [23.0442, 72.4965],
    googleMapsQuery: 'Aman+Akash+Party+Plot+Sindhu+Bhavan+Ahmedabad',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqFvCcV40k_kHWJ0RGnAuANSIFekKQ-XTSZ_wdwWOhTb2CQ5qhIvWDFb3VjWI_gUZdzwXoC4yr9YGdgS6MQ66Nr63hd1epO7FdqBRKHdpvLkRcHKIWK4NaHwZPtA3dZ00hekmnBqAH1EbuSZ6FAMf2Cj33ztMhOJYtxO0XYpfBVXsDZZxRyy3fuQPF-40ox3ooIxJb0Icltl652BFTMA8HsWSEHfplONzkblRF7MRzjnmE89Yk5tR4',
    thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqFvCcV40k_kHWJ0RGnAuANSIFekKQ-XTSZ_wdwWOhTb2CQ5qhIvWDFb3VjWI_gUZdzwXoC4yr9YGdgS6MQ66Nr63hd1epO7FdqBRKHdpvLkRcHKIWK4NaHwZPtA3dZ00hekmnBqAH1EbuSZ6FAMf2Cj33ztMhOJYtxO0XYpfBVXsDZZxRyy3fuQPF-40ox3ooIxJb0Icltl652BFTMA8HsWSEHfplONzkblRF7MRzjnmE89Yk5tR4',
    type: 'Party Plot / Club',
    rating: 4.7,
    reviewsCount: 1680,
    headliners: ['Darshan Raval Special Set', 'Amdavad Beats Crew'],
    themeTitle: 'Chaniya Choli Neon-Glow Fusion',
    themeDescription: 'High-energy youth festival atmosphere with UV neon accent lighting blended seamlessly with genuine traditional chaniya choli borders and pounding dhol rhythms.',
    dressCodeTitle: 'Neon Accents & Traditional Gujarati',
    dressCodeWomen: 'Mirror work Chaniya Choli with bright neon borders (electric pink, neon marigold, fluorescent green) and oxidized jewelry.',
    dressCodeMen: 'Designer embroidered Kediyu or stylized cotton kurta with matching stole.',
    dressCodeStrictness: 'Strictly Enforced',
    groundSurface: 'Spring Wood',
    capacityPercentage: 88,
    checkedInDancers: 3400,
    decibels: 104,
    gateStatus: 'Gate 1 Heavy Queue · Gate 2 Moving Fast',
    startingPrice: 999,
    dholStartTime: '09:00 PM',
    mahaAartiTime: '12:00 AM',
    gatesOpenTime: '08:00 PM',
    participatingNights: [3, 4, 5, 6, 7, 8, 9],
    passTiers: [
      {
        id: 'sbr-regular',
        name: 'Single Youth Dancer',
        badge: 'Fast Filling',
        description: 'Full arena access for 1 dancer',
        price: 999,
        available: true,
        perks: ['Spring wood floor access', 'Glow band at entrance']
      },
      {
        id: 'sbr-vip',
        name: 'VIP Sky Deck Couple',
        badge: 'VIP Lounge',
        description: 'Elevated platform view with food & beverage lounge',
        price: 2499,
        available: true,
        perks: ['Skydeck viewing', 'Valet P1 reserved spot', 'Buffet dinner vouchers']
      }
    ],
    parkingLots: [
      {
        id: 'sbr-p1',
        name: 'SBR Dedicated Valet Terminal',
        code: 'P1',
        type: 'VIP',
        totalSpots: 150,
        availableSpots: 18,
        fillPercentage: 88,
        statusText: '18 spots left · Use SBR service road',
        fastEntrance: true,
        price: 250
      },
      {
        id: 'sbr-p2',
        name: 'Sindhu Bhavan Multi-Plot East Parking',
        code: 'P2',
        type: 'General',
        totalSpots: 400,
        availableSpots: 110,
        fillPercentage: 72,
        statusText: '110 spots left · 3 min walk',
        fastEntrance: true,
        price: 100
      }
    ],
    nearbyFreeParking: [
      {
        id: 'sbr-free-1',
        name: 'Sindhu Bhavan BRTS Parallel Open Bays',
        distance: '250m',
        walkTime: '3 min walk',
        capacityText: 'Approx 160 cars & 250 bikes',
        locationHint: 'Wide dedicated municipal shoulder opposite Taj Skyline road',
        safetyNote: 'Ahmedabad Traffic Police designated free parking strip, high streetlight visibility',
        googleMapsQuery: 'Sindhu+Bhavan+Marg+Free+Parking',
        isOfficialTieUp: true
      },
      {
        id: 'sbr-free-2',
        name: 'Thaltej Shilaj Canal Road Service Plot',
        distance: '480m',
        walkTime: '5 min walk',
        capacityText: 'Approx 200 cars',
        locationHint: 'Canal road intersection with wide open gravel ground',
        safetyNote: 'Organized volunteers guiding cars for easy post-event U-turn',
        googleMapsQuery: 'Thaltej+Shilaj+Canal+Road+Ahmedabad'
      }
    ],
    setlist: [
      { id: 1, title: 'Kamariya & Chogada Remix', artist: 'Darshan Raval', round: 'Round 3 High Energy', duration: '11:00', vibe: 'Electrifying youth frenzy' }
    ]
  },
  {
    id: 'heritage-dhal-ni-pol',
    title: 'Manek Chowk & Dhal ni Pol Heritage Sheri Garba',
    sansthaName: 'Amdavad Heritage Pol Yuvak Mandal',
    venueName: 'Dhal ni Pol Heritage Chawk',
    city: 'Ahmedabad',
    area: 'Old City (Pols)',
    fullAddress: 'Dhal ni Pol, Near Astodia Darwaja & Manek Chowk, Khadia, Ahmedabad - 380001',
    coordinates: [23.0249, 72.5898],
    googleMapsQuery: 'Dhal+ni+Pol+Astodia+Ahmedabad',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGJlTc-jO3HR20aCPjK7WucxZkeENxRMRhD3hGrrPchnVEgOKWQ-crYnMfN36TJEf1WrYK3i7XEXTV6FviO_my92sWiaGCBEhNwm8Sti8qRuhbIn2p_9fIWaXV54vN_VzFsXGzHGP2nDYXKpriJ3c0lUDKAhdf5ZddLHpjP0nAzcBPGWv0hoUmSpQGqlNG20bz_bCtcEoVYmfwE0NGMQw_TG8BfOcfr7YLoTJjzGuy0G24YaEptioK',
    thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGJlTc-jO3HR20aCPjK7WucxZkeENxRMRhD3hGrrPchnVEgOKWQ-crYnMfN36TJEf1WrYK3i7XEXTV6FviO_my92sWiaGCBEhNwm8Sti8qRuhbIn2p_9fIWaXV54vN_VzFsXGzHGP2nDYXKpriJ3c0lUDKAhdf5ZddLHpjP0nAzcBPGWv0hoUmSpQGqlNG20bz_bCtcEoVYmfwE0NGMQw_TG8BfOcfr7YLoTJjzGuy0G24YaEptioK',
    type: 'Traditional Sheri / Pol',
    rating: 5.0,
    reviewsCount: 310,
    headliners: ['Hemant Chauhan Heritage Troupe', 'Acoustic Manjira & Dhol Maestros'],
    themeTitle: 'Centuries-Old UNESCO World Heritage Sheri Raas',
    themeDescription: 'Pure acoustic devotion amidst intricately carved wooden Pol facades, brass diyas, and authentic family mandli circles. Zero tickets, 100% community warmth and prasad distribution.',
    dressCodeTitle: 'Pure Heritage Gujarati Attire',
    dressCodeWomen: 'Traditional Handloom Cotton or Bandhani Chaniya Choli, silver payal / ghungroo, barefoot on ancient paved stone.',
    dressCodeMen: 'White cotton Kurta Kediyu or Dhoti with traditional khes.',
    dressCodeStrictness: 'Strictly Enforced',
    groundSurface: 'Paved Pol Stone',
    capacityPercentage: 62,
    checkedInDancers: 750,
    decibels: 88,
    gateStatus: 'Astodia Gate Open · Pedestrian Walkway Clear',
    startingPrice: 0,
    dholStartTime: '09:00 PM',
    mahaAartiTime: '12:00 AM Midnight',
    gatesOpenTime: '08:00 PM',
    participatingNights: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    passTiers: [
      {
        id: 'pol-free',
        name: 'Community Open Devotee Access',
        badge: 'Free Heritage Entry',
        description: 'Free entry for all traditional devotees (No pass needed, pre-registration gets entry badge)',
        price: 0,
        available: true,
        perks: ['Traditional Garbi pradakshina', 'Hot prasad distribution at midnight', 'Heritage photo walk']
      }
    ],
    parkingLots: [
      {
        id: 'pol-p1',
        name: 'Manek Chowk Multi-Level Parking',
        code: 'P1',
        type: 'General',
        totalSpots: 350,
        availableSpots: 180,
        fillPercentage: 48,
        statusText: '180 spots free · 4 min walk to Dhal ni Pol',
        fastEntrance: true,
        price: 30
      },
      {
        id: 'pol-2w',
        name: 'Astodia Darwaja 2-Wheeler Stand',
        code: '2W',
        type: 'Two-Wheeler',
        totalSpots: 500,
        availableSpots: 210,
        fillPercentage: 58,
        statusText: 'Free for heritage visitors',
        fastEntrance: true,
        price: 0
      }
    ],
    nearbyFreeParking: [
      {
        id: 'pol-free-1',
        name: 'Astodia Municipal Heritage Walk Free Bay',
        distance: '180m',
        walkTime: '2 min walk',
        capacityText: 'Approx 100 cars & 300 two-wheelers',
        locationHint: 'Under the ancient Astodia Gate arches along heritage pedestrian corridor',
        safetyNote: 'Designated 100% free by AMC Heritage Cell with local volunteer night watch',
        googleMapsQuery: 'Astodia+Gate+Ahmedabad+Free+Parking',
        isOfficialTieUp: true
      },
      {
        id: 'pol-free-2',
        name: 'Khadia 4-Rasta Open Street Parking',
        distance: '320m',
        walkTime: '4 min walk',
        capacityText: 'Approx 80 vehicles',
        locationHint: 'Wide road towards Raipur Darwaja with designated parallel bays',
        safetyNote: 'Festive street lighting and continuous family devotee movement',
        googleMapsQuery: 'Khadia+Ahmedabad+Parking'
      }
    ],
    setlist: [
      { id: 1, title: 'Ambe Maa Na Duha & Chhand', artist: 'Hemant Chauhan', round: 'Acoustic Devotion', duration: '22:00', vibe: 'Soul-stirring classical folk' },
      { id: 2, title: 'Manek Chowk Ni Sheri Garbi', artist: 'Local Mandli Elders', round: 'Traditional 2-Taali', duration: '18:00', vibe: 'Synchronized graceful steps' }
    ]
  },
  {
    id: 'eka-club-kankaria',
    title: 'Karnavati Raas Utsav at The Eka Club',
    sansthaName: 'The Eka Club Arena Sports & Culture',
    venueName: 'The Eka Club Stadium Arena',
    city: 'Ahmedabad',
    area: 'Kankaria',
    fullAddress: 'The Eka Club, Gate No. 3, Kankaria Lakefront, Ahmedabad - 380022',
    coordinates: [22.9972, 72.6021],
    googleMapsQuery: 'The+Eka+Club+Kankaria+Ahmedabad',
    bannerImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqFvCcV40k_kHWJ0RGnAuANSIFekKQ-XTSZ_wdwWOhTb2CQ5qhIvWDFb3VjWI_gUZdzwXoC4yr9YGdgS6MQ66Nr63hd1epO7FdqBRKHdpvLkRcHKIWK4NaHwZPtA3dZ00hekmnBqAH1EbuSZ6FAMf2Cj33ztMhOJYtxO0XYpfBVXsDZZxRyy3fuQPF-40ox3ooIxJb0Icltl652BFTMA8HsWSEHfplONzkblRF7MRzjnmE89Yk5tR4',
    thumbnailImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqFvCcV40k_kHWJ0RGnAuANSIFekKQ-XTSZ_wdwWOhTb2CQ5qhIvWDFb3VjWI_gUZdzwXoC4yr9YGdgS6MQ66Nr63hd1epO7FdqBRKHdpvLkRcHKIWK4NaHwZPtA3dZ00hekmnBqAH1EbuSZ6FAMf2Cj33ztMhOJYtxO0XYpfBVXsDZZxRyy3fuQPF-40ox3ooIxJb0Icltl652BFTMA8HsWSEHfplONzkblRF7MRzjnmE89Yk5tR4',
    type: 'Party Plot / Club',
    rating: 4.7,
    reviewsCount: 980,
    headliners: ['Aishwarya Majmudar Live', 'Dandiya Beats Symphony'],
    themeTitle: 'Lakeside Mirror & Royal Brocade Raas',
    themeDescription: 'State-of-the-art sports stadium lawn converted into an illuminated Garba colosseum overlooking Kankaria lake breeze with soft shock-absorbing rolled turf.',
    dressCodeTitle: 'Royal Brocade & Mirror Chaniya Choli',
    dressCodeWomen: 'Brocade / silk Chaniya Choli with mirror work dupatta, traditional kamarbandh.',
    dressCodeMen: 'Traditional embroidered Kurta or Kediyu with dhoti.',
    dressCodeStrictness: 'Strictly Enforced',
    groundSurface: 'Lush Green Turf',
    capacityPercentage: 95,
    checkedInDancers: 3950,
    decibels: 102,
    gateStatus: 'Gates 3 & 4 Heavy Rush · Metro Access Recommended',
    startingPrice: 750,
    dholStartTime: '08:30 PM',
    mahaAartiTime: '12:00 AM',
    gatesOpenTime: '07:30 PM',
    participatingNights: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    passTiers: [
      {
        id: 'eka-single',
        name: 'Single Arena Pass',
        badge: 'Waitlist Open',
        description: 'Entry to stadium arena floor',
        price: 750,
        available: false,
        perks: ['Stadium floor access', 'Red carpet entry']
      },
      {
        id: 'eka-vip',
        name: 'VIP Lounge Couple Pass',
        badge: 'Only 5 Left',
        description: 'Air-conditioned lounge viewing + arena dancing ring',
        price: 2199,
        available: true,
        perks: ['VIP Lounge access', 'Kankaria lakeside valet tag', 'Exclusive dinner spread']
      }
    ],
    parkingLots: [
      {
        id: 'eka-p1',
        name: 'Eka Club Multi-Level Parking',
        code: 'P1',
        type: 'VIP',
        totalSpots: 300,
        availableSpots: 15,
        fillPercentage: 95,
        statusText: '95% Full · Reserved for VIP Passholders',
        fastEntrance: true,
        price: 200
      },
      {
        id: 'eka-p2',
        name: 'Kankaria Gate 2 Public Lot',
        code: 'P2',
        type: 'General',
        totalSpots: 500,
        availableSpots: 90,
        fillPercentage: 82,
        statusText: '90 spots free · Recommend Kankaria East Metro',
        fastEntrance: true,
        price: 100
      }
    ],
    nearbyFreeParking: [
      {
        id: 'eka-free-1',
        name: 'Kankaria Lake Gate 4 Football Ground Perimeter',
        distance: '260m',
        walkTime: '3 min walk',
        capacityText: 'Approx 240 cars & 400 bikes',
        locationHint: 'Lakefront outer promenade wide paved bays, open municipal parking zone',
        safetyNote: 'Designated free event parking with Kankaria police station outpost',
        googleMapsQuery: 'Kankaria+Lake+Gate+4+Free+Parking',
        isOfficialTieUp: true
      },
      {
        id: 'eka-free-2',
        name: 'Kankaria East Metro Station Park & Ride',
        distance: '380m',
        walkTime: '4 min walk',
        capacityText: 'Approx 180 cars · Free with Metro or Garba pass',
        locationHint: 'Under elevated metro viaduct with direct pedestrian crossover to Gate 3',
        safetyNote: 'CCTV monitored with security turnstile guard',
        googleMapsQuery: 'Kankaria+East+Metro+Station+Ahmedabad'
      }
    ],
    setlist: [
      { id: 1, title: 'Kesariyo Rang Tane Lagyo', artist: 'Aishwarya Majmudar', round: 'Round 2 Dodhiya', duration: '12:00', vibe: 'Energetic melodic raas' }
    ]
  }
];

export const INITIAL_REVIEWS: CommunityReview[] = [
  {
    id: 'rev-1',
    authorName: 'Kavita Patel',
    avatarInitials: 'KP',
    venueName: 'Mandli Garba at YMCA Club',
    timeAgo: '40 mins ago',
    isVerifiedPassholder: true,
    isTopReviewer: true,
    singerRating: 5,
    parkingRating: 3,
    themeRating: 5,
    soundRating: 5,
    securityRating: 5,
    comment: 'Aditya Gadhvi was absolutely phenomenal! The Khalasi drop at 11:30 PM had the entire ground erupting. Ground sand was smooth, no ankle twists. Parking note: Avoid SG Highway service lane after 9:30 PM; park at P2 near Iskcon crossroads or use the P3 overflow valet instead!',
    helpfulCount: 142,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCp92pG0EiKYKbU-TUnnVKloD2xyDlvAszu4Suc0uxvaH1rVH4Fdg1-hHh4qjsxw2xIze8Xv_rg-xBjyIdiq8wEWe8yZ2WAd5Fe47__SOX414vblC_-sIru4gSzRUQhwyHpPDU2syZlRQji_tbDgSrzdxBsAaymQ-Rj6e8NS6ixf8td219cV3MqVvYSL_zPfQREY7HmkH60s5GY0JEt2e9gNIyJc25P9L02NgJog2m5eWefKtJrZmeD',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBCeC1mDNzx-y40HOwsWtOiJWsw-GCeBuDd9mvBXrwrWMoZ_DIHX0SFIkW7RyFIB1kyBsYCX9IetlCrHmNAAV03IVUr1a9KW2LYFKeM4ZBBe2OYJ4K59CgOpoAyOy4F2A_0ECczw5tVql_D5Z70atAM1QfZL2gwvAgCOeXPOA_ngQly7hi85GKy_Zp23dOVuzkvD_Kll2hZjGLXR23vT1cQz_5XUjc_LZZXSe1UHwhZJ35vmBnl5rGf'
    ]
  },
  {
    id: 'rev-2',
    authorName: 'Jignesh Shah',
    avatarInitials: 'JS',
    venueName: 'Suvarn Navratri at Karnavati Club',
    timeAgo: '2 hours ago',
    isVerifiedPassholder: true,
    isTopReviewer: true,
    singerRating: 5,
    parkingRating: 4,
    themeRating: 5,
    soundRating: 5,
    securityRating: 5,
    comment: 'Kinjal Dave sang non-stop 3-taali for 2 hours straight. Best traditional Gujarati vibe in Ahmedabad! Valet parking took only 10 mins to retrieve via the in-app token system. Highly recommended to wear heavy traditional attire as ground security checks dress code at turnstiles.',
    helpfulCount: 89,
    images: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD4bqxsaERiaU9JfTkGFp0CrONidMAcPm48R0dd-KbydzyugeYsIat7bZx5fIWI3jv78TXbHlGfAgrXo49cvuIB8Z10ohfDM-iK92wzQBD0Ev7mLMucah_wPiIow0TUYbblEyPX5PwqsO20YyoJP5lHJ0JJyvbYsFnbiZbbvdmgkYUCuPEVROwc6x9MkbcEg4s27GuA7BOQ1RRPggP_HW2wAXtgoMn6cwwEWd79t_bZPLQdr2Ni6p0I'
    ]
  },
  {
    id: 'rev-3',
    authorName: 'Riddhi Trivedi',
    avatarInitials: 'RT',
    venueName: 'United Way of Amdavad (Adani Shantigram)',
    timeAgo: '3 hours ago',
    isVerifiedPassholder: true,
    singerRating: 5,
    parkingRating: 5,
    themeRating: 5,
    soundRating: 5,
    securityRating: 4,
    comment: 'Atul Purohit is incomparable. The synchronized concentric circle of 30,000 dancers moving without any shoving or rush was breathtaking. Shantigram South P2 parking is gigantic - parked in 30 seconds!',
    helpfulCount: 114
  }
];

export const INITIAL_POLL_OPTIONS: SongPollOption[] = [
  { id: 'khalasi', title: 'Khalasi', artist: 'Aditya Gadhvi', votesPercentage: 48 },
  { id: 'dholida', title: 'Dholida', artist: 'Falguni Pathak Classic', votesPercentage: 29 },
  { id: 'sanedo', title: 'Sanedo', artist: 'Maniaraj Barot Folk', votesPercentage: 23 }
];
