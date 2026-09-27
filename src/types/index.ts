export type City = 'Ahmedabad' | 'Gandhinagar' | 'All';

export type Area = 
  | 'SG Highway' 
  | 'Sindhu Bhavan' 
  | 'Bodakdev' 
  | 'Satellite' 
  | 'Old City (Pols)' 
  | 'Kankaria' 
  | 'Vaishnodevi Circle'
  | 'Gandhinagar Infocity' 
  | 'GIFT City' 
  | 'Sector 11 Gandhinagar';

export type VenueType = 'Party Plot / Club' | 'Traditional Sheri / Pol' | 'Society Mandli' | 'College / Youth';

export interface PassTier {
  id: string;
  name: string;
  badge?: string;
  description: string;
  price: number;
  available: boolean;
  perks: string[];
}

export interface ParkingLot {
  id: string;
  name: string;
  code: 'P1' | 'P2' | 'P3' | '2W';
  type: 'VIP' | 'General' | 'Valet & Shuttle' | 'Two-Wheeler';
  totalSpots: number;
  availableSpots: number;
  fillPercentage: number;
  statusText: string;
  fastEntrance: boolean;
  price: number; // 0 for free
}

export interface SetlistTrack {
  id: number;
  title: string;
  artist: string;
  round: string;
  duration: string;
  vibe: string;
  audioSampleUrl?: string;
}

export interface NearbyFreeParking {
  id: string;
  name: string;
  distance: string; // e.g. "250m" or "400m walk"
  walkTime: string; // e.g. "4 min walk"
  capacityText: string; // e.g. "Approx 120 cars & bikes"
  locationHint: string; // e.g. "Behind Sindhu Bhavan BRTS or wide municipal ground"
  safetyNote: string; // e.g. "Well lit, CCTV monitored by Amdavad Police"
  googleMapsQuery: string;
  isOfficialTieUp?: boolean;
}

export interface GarbaEvent {
  id: string;
  title: string;
  sansthaName: string;
  venueName: string;
  city: 'Ahmedabad' | 'Gandhinagar';
  area: Area;
  fullAddress: string;
  coordinates: [number, number]; // [lat, lng]
  googleMapsQuery: string;
  bannerImage: string;
  thumbnailImage: string;
  type: VenueType;
  rating: number;
  reviewsCount: number;
  headliners: string[];
  headlinerPhoto?: string;
  specialGuest?: string;
  specialGuestPhoto?: string;
  themeTitle: string;
  themeDescription: string;
  dressCodeTitle: string;
  dressCodeWomen: string;
  dressCodeMen: string;
  dressCodeStrictness: 'Strictly Enforced' | 'Traditional Preferred' | 'Casual Friendly';
  groundSurface: 'Soft Red Sand (Reti)' | 'Spring Wood' | 'Lush Green Turf' | 'Paved Pol Stone';
  capacityPercentage: number;
  checkedInDancers: number;
  decibels: number;
  gateStatus: string;
  passTiers: PassTier[];
  startingPrice: number;
  parkingLots: ParkingLot[];
  nearbyFreeParking?: NearbyFreeParking[];
  dholStartTime: string;
  mahaAartiTime: string;
  gatesOpenTime: string;
  participatingNights: number[]; // 1 to 9
  setlist: SetlistTrack[];
  isSpotlight?: boolean;
}

export interface BookingPass {
  bookingId: string;
  eventId: string;
  eventName: string;
  venueName: string;
  fullAddress: string;
  nightNumber: number;
  nightName: string;
  dateStr: string;
  tierId: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
  upiRef: string;
  passHolderName: string;
  gateAssigned: string;
  dressCodeSummary: string;
  rfidBooth: string;
  bookedAt: string;
  qrToken: string;
  hasParking: boolean;
  parkingSlotCode?: string;
  vehicleNumber?: string;
  parkingPassCode?: string;
}

export interface ParkingBooking {
  bookingId: string;
  eventId: string;
  venueName: string;
  lotCode: string;
  lotName: string;
  vehicleType: '2-Wheeler' | 'Car' | 'SUV' | 'Valet VIP';
  vehicleNumber: string;
  timeSlot: string;
  price: number;
  entryGate: string;
  qrToken: string;
  bookedAt: string;
}

export interface CommunityReview {
  id: string;
  authorName: string;
  avatarInitials: string;
  venueName: string;
  timeAgo: string;
  isVerifiedPassholder: boolean;
  isTopReviewer?: boolean;
  singerRating: number;
  parkingRating: number;
  themeRating: number;
  soundRating: number;
  securityRating: number;
  comment: string;
  helpfulCount: number;
  images?: string[];
  userVotedHelpful?: boolean;
}

export interface SongPollOption {
  id: string;
  title: string;
  artist: string;
  votesPercentage: number;
}
