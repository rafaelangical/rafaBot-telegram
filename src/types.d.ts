// eslint-disable-next-line no-unused-vars
declare namespace Types {
  export interface Links {
    next?: string;
    prev?: string;
    self?: string;
  }

  export interface KilometersDiameter {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }

  export interface MetersDiameter {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }

  export interface MilesDiameter {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }

  export interface FeetDiameter {
    estimated_diameter_min: number;
    estimated_diameter_max: number;
  }

  export interface EstimatedDiameters {
    kilometers: KilometersDiameter;
    meters: MetersDiameter;
    miles: MilesDiameter;
    feet: FeetDiameter;
  }

  export interface VelocityRelative {
    kilometers_per_second: number;
    kilometers_per_hour: number;
    miles_per_hour: number;
  }

  export interface MissDistance {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  }

  export interface ApproachData {
    close_approach_date: string;
    close_approach_date_full: string;
    epoch_date_close_approach: number;
    relative_velocity: VelocityRelative;
    miss_distance: [Object];
    orbiting_body: string;
  }

  export interface Nears {
    links: Links;
    id: number;
    neo_reference_id: string;
    name: string;
    nasa_jpl_url: string;
    absolute_magnitude_h: number;
    estimated_diameter: EstimatedDiameters;
    is_potentially_hazardous_asteroid: boolean;
    close_approach_data: ApproachData;
    is_sentry_object: boolean;
  }

  export interface Near {
    obj: Nears[];
  }

  export interface NasaApiResponse {
    links: Links;
    element_count: number;
    near_earth_objects: Near;
  }
}
