/* -------------------------------------------------------------------------- */
/*                               TYPE INTERFACES                              */
/* -------------------------------------------------------------------------- */
interface Livestock {
  tagID: int;
  animalType: AnimalType;
  age: int;
  diet: CropType;
  weight: double;
  harvestable: boolean;
  lastFed: string | null;
  lastViolatedForHarvestedGoods: string | null;
  foodSpent?: int | null;
  waterSpent?: int | null;
}

interface LivestockDTO {
  tag_id?: int;
  animal_type?: AnimalType | null;
  age?: int | null;
  diet?: CropType | null;
  weight?: double | null;
  harvestable?: boolean | null;
  last_fed?: string | null;
  last_violated_for_harvested_goods?: string | null;
}

interface FilteredLivestock {
  tagID?: { min: int; max: int };
  animalType?: AnimalType;
  diet?: CropType;
  age?: { min: int; max: int };
  weight?: { min: double; max: double };
  lastFed?: { min: string; max: string };
  lastViolatedForHarvestedGoods?: {
    min: string;
    max: string;
  };
  harvestable?: boolean | string;
  minFoodSpent?: int;
  minWaterSpent?: int;
  // orderBy?: string | null;
  // order?: boolean | null;
}

interface Crop {
  cropType: CropType;
  cropVariant: CropVariant;
  cropStatus: CropStatus;
  quantity: int;
}

interface FilteredCrop {
  cropType?: CropType | null;
  cropVariant?: CropVariant | null;
  cropStatus?: CropStatus | null;
  quantity?: { min: int | null; max: int | null } | null;
  // orderBy?: String | null;
  // order?: boolean | null;
}

interface CountResponse {
  count: int;
}
