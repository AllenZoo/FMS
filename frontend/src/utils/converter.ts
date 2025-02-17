export function filterLivestockToQueryParams(
  livestockFilter: FilteredLivestock
): Record<string, string> {
  const queryParams: Record<string, string> = {};

  if (!isNullOrUndefined(livestockFilter.tagID?.min)) {
    queryParams.minTagID = livestockFilter.tagID?.min.toString();
  }
  if (!isNullOrUndefined(livestockFilter.tagID?.max)) {
    queryParams.maxTagID = livestockFilter.tagID?.max.toString();
  }
  if (!isNullOrUndefined(livestockFilter.diet)) {
    queryParams.diet = livestockFilter.diet;
  }
  if (!isNullOrUndefined(livestockFilter.age?.min)) {
    queryParams.minAge = livestockFilter.age?.min.toString();
  }
  if (!isNullOrUndefined(livestockFilter.age?.max)) {
    queryParams.maxAge = livestockFilter.age?.max.toString();
  }
  if (!isNullOrUndefined(livestockFilter.weight?.min)) {
    queryParams.minWeight = livestockFilter.weight?.min.toString();
  }
  if (!isNullOrUndefined(livestockFilter.weight?.max)) {
    queryParams.maxWeight = livestockFilter.weight?.max.toString();
  }
  if (!isNullOrUndefined(livestockFilter.animalType)) {
    queryParams.animalType = livestockFilter.animalType;
  }
  if (!isNullOrUndefined(livestockFilter.lastFed?.min)) {
    queryParams.minLastFed = livestockFilter.lastFed?.min!;
  }
  if (!isNullOrUndefined(livestockFilter.lastFed?.max)) {
    queryParams.maxLastFed = livestockFilter.lastFed?.max!;
  }
  if (!isNullOrUndefined(livestockFilter.lastViolatedForHarvestedGoods?.min)) {
    queryParams.minLastViolatedForHarvestedGoods =
      livestockFilter.lastViolatedForHarvestedGoods?.min!;
  }
  if (!isNullOrUndefined(livestockFilter.lastViolatedForHarvestedGoods?.max)) {
    queryParams.maxLastViolatedForHarvestedGoods =
      livestockFilter.lastViolatedForHarvestedGoods?.max!;
  }
  if (!isNullOrUndefined(livestockFilter.harvestable)) {
    queryParams.harvestable = livestockFilter.harvestable!.toString();
  }
  if (!isNullOrUndefined(livestockFilter.minFoodSpent)) {
    queryParams.minFoodSpent = livestockFilter.minFoodSpent.toString();
  }
  if (!isNullOrUndefined(livestockFilter.minWaterSpent)) {
    queryParams.minWaterSpent = livestockFilter.minWaterSpent.toString();
  }

  return queryParams;
}

function isNullOrUndefined(value: any) {
  return value === null || value === undefined;
}
