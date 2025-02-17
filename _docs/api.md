# API Documentation

## Introduction

Welcome to the API documentation for the Farming Management System. This documentation provides an overview of the
available endpoints, request/response formats, and example usage.

## Table of Contents
- [Base URL](#base-url)
- [Authentication](#authentication)
- [Endpoints](#endpoints)
  <details>
     
     <summary><a href="#livestock">Livestock</a></summary>
     
   - [Get All](#get-all-livestock)
   - [Get Filtered](#get-livestock-with-filters)
   - [Get Specific](#get-a-specific-livestock)
   - [Create](#create-a-new-livestock)
   - [Update/Replace](#update-an-existing-livestock)
   - [Partially update](#partially-updating-an-existing-livestock)
   - [Delete](#delete-a-livestock)
   </details>
   <details>
     
     <summary><a href="#crops">Crops</a></summary>
     
   - [Get All](#get-all-crops)
   - [Get Filtered](#get-filtered-crops)
   - [Get Specific](#get-crop-by-type-variant-and-status)
   - [Create](#create-a-new-crop)
   - [Update/Replace](#update-crop-by-type-variant-and-status)
   - [Delete](#delete-crop-by-type-variant-and-status)
   </details>
- [Error Handling](#error-handling)
- [Conclusion](#conclusion)
## Base URL

There is currently no domain name associated with the application.

## Authentication

To access the API, you need to include an authentication token in the request headers. The token should be included in
the Authorization header as a Bearer token.

## Endpoints
<details><summary>
  
### **Livestock**
</summary>
<details><summary>
   
#### Get all livestock
   </summary>

* Endpoint: /api/v1/livestock
* Method: GET
* Description: Retrieves a list of all livestock entries.
* Request Parameters: None
* Response:
    * Status Code: 200 (OK)
    * Body:

```json
[
  {
    "tag_id": 1,
    "animal_type": "CHICKEN",
    "age": 2,
    "weight": 1.5,
    "last_fed": "2023-07-09",
    "harvestable": true,
    "last_violated_for_harvested_goods": "2023-07-08"
  },
  ...
]
```
</details>

<details><summary>
   
#### Get livestock with filters
</summary>

* Endpoint: /api/v1/livestock/filtered
* Method: GET
* Description: Retrieves a list of livestock entries based on the provided filter parameters
* Request Parameters:
   * filterParams (query parameter): A map of filter parameters to narrow down the livestock results.
      *  animalType (optional): Filter by animal type.
      *  minAge (optional): Filter by minimum age.
      *  maxAge (optional): Filter by maximum age.
      *  harvestable (optional): Filter by harvestable status (true/false).
      *  diet (optional): Filter by diet.
      *  minTagID (optional): Filter by minimum tag ID.
      *  maxTagID (optional): Filter by maximum tag ID.
      *  minWaterSpent (optional): Filter by minimum water spent.
      *  minFoodSpent (optional): Filter by minimum food spent.
* Example Request: GET /api/v1/livestock/filtered?animalType=cow&minAge=2&maxWeight=500
* Response:
   * Status Code: 200 (OK)
   * Body:

```json
[
  {
    "tag_id": 1,
    "animal_type": "COW",
    "age": 2,
    "weight": 600,
    "last_fed": "2023-07-09",
    "harvestable": true,
    "last_violated_for_harvested_goods": "2023-07-08"
  },
  ...
]
```
</details>
<details><summary>
   
#### Get a specific livestock
</summary>

* Endpoint: /api/v1/livestock/{tagId}
* Method: GET
* Description: Retrieves a specific livestock entry by its tag ID.
* Request Parameters:
    * {tagId} (path parameter): The tag ID of the livestock.
* Response:
    * Status Code: 200 (OK)
    * Body:

```json
 {
  "tag_id": 1,
  "animal_type": "CHICKEN",
  "age": 2,
  "weight": 1.5,
  "last_fed": "2023-07-09",
  "harvestable": true,
  "last_violated_for_harvested_goods": "2023-07-08"
}
```
</details>
<details><summary>
   
#### Create a new livestock
</summary>

* Endpoint: /api/v1/livestock
* Method: POST
* Description: Creates a new livestock entry.
* Request Body:

```json
{
  "animal_type": "SHEEP",
  "age": 1,
  "weight": 30.5,
  "last_fed": "2023-07-09",
  "harvestable": false,
  "last_violated_for_harvested_goods": null
}
```

* Response:
    * Status Code: 201 (Created)
    * Body:

```json
{
  "tag_id": 2,
  "animal_type": "SHEEP",
  "age": 1,
  "weight": 30.5,
  "last_fed": "2023-07-09",
  "harvestable": false,
  "last_violated_for_harvested_goods": null
}
```
</details>

<details><summary>
   
#### Update an existing livestock
</summary>
* Endpoint: /api/v1/livestock/{tagID}
* Method: PUT
* Description: Updates an existing livestock entry.
* Request Parameters:
   {tagId} (path parameter): The tag ID of the livestock to be updated.
* Request Body:

```json
{
  "animal_type": "COW",
  "age": 3,
  "diet": "WHEAT",
  "weight": 500.0,
  "last_fed": "2023-07-09",
  "harvestable": true,
  "last_violated_for_harvested_goods": null
}
```

* Response:
    * Status Code: 200 (OK)
    * Body:

```json
{
  "tag_id": 1,
  "animal_type": "COW",
  "age": 3,
  "diet": "WHEAT",
  "weight": 500.0,
  "last_fed": "2023-07-09",
  "harvestable": true,
  "last_violated_for_harvested_goods": null
}
```
</details>

<details><summary>
   
#### Partially updating an existing livestock
</summary>

* Endpoint: /api/v1/livestock/{tagId}
* Method: PATCH
* Description: Partially updates an existing livestock entry.
* Request Parameters:
  {tagId} (path parameter): The tag ID of the livestock to be updated.
* Request Body:

```json
{
  "age": 3,
  "weight": 500.0,
  "last_fed": "2023-07-09",
}
```

* Response:
    * Status Code: 200 (OK)
    * Body:

```json
{
  "tag_id": 1,
  "animal_type": "COW",
  "age": 3,
  "diet": "WHEAT",
  "weight": 500.0,
  "last_fed": "2023-07-09",
  "harvestable": true,
  "last_violated_for_harvested_goods": null
}
```
</details>
<details><summary>
   
#### Delete a livestock
</summary>

* Endpoint: /api/v1/livestock/{tagId}
* Method: DELETE
* Description: Deletes a specific livestock entry by its tag ID.
* Request Parameters:
  {tagId} (path parameter): The tag ID of the livestock to be deleted.
* Response:
    * Status Code: 204 (No Content)
</details>
</details>
<details><summary>

### Crops
  </summary>

<details><summary>
  
#### Get All Crops
</summary>

- **Endpoint**: `/api/v1/crops`
- **Method**: GET
- **Description**: Retrieves a list of all crops.
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
```json
[
  {
      "crop_type": "CANOLA",
      "crop_variant": "POLLINATED",
      "crop_status": "PLANTED",
      "quantity": 100
  },
  ...
]
```
    
</details>
<details><summary>
  
#### Get Filtered Crops
</summary>

* **Endpoint**: `/api/v1/crops/filtered?filterParams...`
* **Method**: GET
* **Description**: Retrieves filtered crops based on the provided filter parameters.
* **Request Parameters**: `filterParams` (query parameter)
    *  cropType (optional): Filter by crop type (canola, wheat, etc.).
    *  cropVariant (optional): Filter by crop variant (pollinated, hybrids).
    *  cropStatus (optional): Filter by crop status (planted, harvested).
    *  minQuantity (optional): Filter by minimum quantity.
    *  maxQuantity (optional): Filter by maximum quantity.
* **Example Request**: GET /api/v1/crops/filtered?cropStatus=planted&cropType=potatoes
* **Response**:
  * **Status Code**: 200 (OK)
  * **Body**:
```json
[
  {
      "crop_type": "POTATOES",
      "crop_variant": "POLLINATED",
      "crop_status": "PLANTED",
      "quantity": 80
  },
  ...
]
```

</details>
<details><summary>
  
#### Get Crop by Type, Variant, and Status
</summary>

- **Endpoint**: `/api/v1/crops/{cropType}/{cropVariant}/{cropStatus}`
- **Method**: GET
- **Description**: Retrieves a specific crop by its type, variant, and status.
- **Request Parameters**:
  - `{cropType}` (path parameter): Crop type
  - `{cropVariant}` (path parameter): Crop variant
  - `{cropStatus}` (path parameter): Crop status
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
```json
  {
      "crop_type": "CANOLA",
      "crop_variant": "POLLINATED",
      "crop_status": "PLANTED",
      "quantity": 100
  }
```
</details>
<details><summary>
  
#### Create a New Crop
</summary>

- **Endpoint**: `/api/v1/crops`
- **Method**: POST
- **Description**: Creates a new crop entry. If an existing crop with the same type, variant, and status exists, the quantity will be added to the existing row.
- **Request Body**:
```json
  {
      "crop_type": "CANOLA",
      "crop_variant": "POLLINATED",
      "crop_status": "PLANTED",
      "quantity": 100
  }
```
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
```json
  {
      "crop_type": "CANOLA",
      "crop_variant": "POLLINATED",
      "crop_status": "PLANTED",
      "quantity": 200
  }
```
</details>
<details><summary>

#### Update Crop by Type, Variant, and Status
  </summary>


- **Endpoint**: `/api/v1/crops/{cropType}/{cropVariant}/{cropStatus}`
- **Method**: PUT
- **Description**: Updates the quantity of an existing crop entry by its type, variant, and status.
- **Request Parameters**:
  - `{cropType}` (path parameter): Crop type
  - `{cropVariant}` (path parameter): Crop variant
  - `{cropStatus}` (path parameter): Crop status
- **Request Body**:
```json
  {
      "quantity": 100
  }
```
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**:
```json
{
    "crop_type": "CANOLA",
    "crop_variant": "POLLINATED",
    "crop_status": "PLANTED",
    "quantity": 100
}
```
</details>
<details><summary>

  #### Delete Crop by Type, Variant, and Status
</summary>


- **Endpoint**: `/api/v1/crops/{cropType}/{cropVariant}/{cropStatus}`
- **Method**: DELETE
- **Description**: Deletes a specific crop entry by its type, variant, and status.
- **Request Parameters**:
  - `{cropType}` (path parameter): Crop type
  - `{cropVariant}` (path parameter): Crop variant
  - `{cropStatus}` (path parameter): Crop status
- **Response**:
  - **Status Code**: 200 (OK)
  - **Body**: No content
</details>
</details>

### Error Handling

In case of any errors, the API will return appropriate HTTP status codes along with error messages in the response body.

### Conclusion

This concludes the API documentation for the Farming Management System. Please refer to the provided endpoint details
and example requests/responses to integrate and utilize the API effectively.
