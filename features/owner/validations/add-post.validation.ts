import { AddPropertyForm } from "../types/add-property.types";

export const validateAddPostForm = (
  form: AddPropertyForm
): Record<string, string> => {
  const errors: Record<string, string> = {};

  // 🏠 Rent Type
  if (!form.rentType) errors.rentType = "Rent type is required";

  // 🏢 Property Type
  if (!form.propertyType) errors.propertyType = "Property type is required";

  // 🛏 Bedrooms
  if (!form.bedrooms) errors.bedrooms = "Bedrooms count is required";
  else if (isNaN(Number(form.bedrooms)))
    errors.bedrooms = "Bedrooms must be a valid number";
  else if (Number(form.bedrooms) < 1)
    errors.bedrooms = "At least one bedroom required";
  else if (Number(form.bedrooms) > 20)
    errors.bedrooms = "Bedrooms cannot exceed 20";

  // 🚿 Bathrooms
  if (!form.bathrooms) errors.bathrooms = "Bathrooms count is required";
  else if (isNaN(Number(form.bathrooms)))
    errors.bathrooms = "Bathrooms must be a valid number";
  else if (Number(form.bathrooms) < 1)
    errors.bathrooms = "At least one bathroom required";
  else if (Number(form.bathrooms) > 20)
    errors.bathrooms = "Bathrooms cannot exceed 20";

  // 🪑 Furnishing
  if (!form.furnishing) errors.furnishing = "Furnishing type is required";

  // 🏗 Project Name
  if (!form.projectName?.trim())
    errors.projectName = "Project name is required";
  else if (form.projectName.length < 3)
    errors.projectName = "Project name must be at least 3 characters";
  else if (form.projectName.length > 50)
    errors.projectName = "Project name cannot exceed 50 characters";

  // 📅 Availability
  if (!form.availabilityDate)
    errors.availabilityDate = "Availability date is required";

  // 🧱 Rent Type - Conditional Fields
  if (form.rentType === "Monthly") {
    // Total Floors
    if (!form.totalFloors) errors.totalFloors = "Total floors required";
    else if (isNaN(Number(form.totalFloors)))
      errors.totalFloors = "Total floors must be a number";
    else if (Number(form.totalFloors) <= 0)
      errors.totalFloors = "Total floors must be greater than 0";
    else if (Number(form.totalFloors) > 200)
      errors.totalFloors = "Building seems too tall (max 200 floors)";

    // Floor No
    if (!form.floorNo) errors.floorNo = "Floor number required";
    else if (isNaN(Number(form.floorNo)))
      errors.floorNo = "Floor number must be numeric";
    else if (Number(form.floorNo) <= 0)
      errors.floorNo = "Floor number must be at least 1";
    else if (
      form.totalFloors &&
      Number(form.floorNo) > Number(form.totalFloors)
    )
      errors.floorNo = "Floor number cannot exceed total floors";

    // Facing
    if (!form.facing) errors.facing = "Facing direction is required";

    // Property Length
    if (!form.propertyLength)
      errors.propertyLength = "Property length is required";
    else if (isNaN(Number(form.propertyLength)))
      errors.propertyLength = "Property length must be numeric";
    else if (Number(form.propertyLength) < 100)
      errors.propertyLength = "Length should be at least 100 sq ft";
    else if (Number(form.propertyLength) > 20000)
      errors.propertyLength = "Length cannot exceed 20000 sq ft";

    // Property Age
    if (!form.propertyAge) errors.propertyAge = "Property age is required";
    else if (isNaN(Number(form.propertyAge)))
      errors.propertyAge = "Property age must be numeric";
    else if (Number(form.propertyAge) < 0)
      errors.propertyAge = "Property age cannot be negative";
    else if (Number(form.propertyAge) > 100)
      errors.propertyAge = "Property age cannot exceed 100 years";

    // ✅ Advance Amount
    if (!form.advanceAmount) {
      errors.advanceAmount = "Advance amount is required";
    } else if (isNaN(Number(form.advanceAmount))) {
      errors.advanceAmount = "Advance amount must be a valid number";
    } else if (Number(form.advanceAmount) < 0) {
      errors.advanceAmount = "Advance amount cannot be negative";
    } else if (Number(form.advanceAmount) > 10000000) {
      errors.advanceAmount = "Advance amount is too high";
    }

    // ✅ Months Advance
    if (!form.monthsAdvance) {
      errors.monthsAdvance = "Number of months advance is required";
    } else if (isNaN(Number(form.monthsAdvance))) {
      errors.monthsAdvance = "Months advance must be numeric";
    } else if (Number(form.monthsAdvance) < 1) {
      errors.monthsAdvance = "Minimum 1 month advance required";
    } else if (Number(form.monthsAdvance) > 12) {
      errors.monthsAdvance = "Advance months cannot exceed 12";
    }

    // ✅ Maintenance
    if (!form.maintenance) {
      errors.maintenance = "Maintenance amount is required";
    } else if (isNaN(Number(form.maintenance))) {
      errors.maintenance = "Maintenance must be numeric";
    } else if (Number(form.maintenance) < 0) {
      errors.maintenance = "Maintenance cannot be negative";
    } else if (Number(form.maintenance) > 50000) {
      errors.maintenance = "Maintenance amount too high";
    }
  }

  // 🌳 Amenities
  if (!form.amenities || form.amenities.length === 0)
    errors.amenities = "Select at least one amenity";

  // 🌍 Location validation
  const nameRegex = /^[A-Za-z\s]+$/; // Only letters and spaces

  // if (!form.country?.trim()) {
  //   errors.country = "Country is required";
  // } else if (!nameRegex.test(form.country)) {
  //   errors.country = "Country name must contain only letters";
  // }

  // if (!form.location?.trim()) {
  //   errors.location = "Location is required";
  // } else if (!nameRegex.test(form.location)) {
  //   errors.location = "Location name must contain only letters";
  // }

  // if (!form.area?.trim()) {
  //   errors.area = "Area is required";
  // } else if (form.area.length > 100) {
  //   errors.area = "Area name too long";
  // }

  // 🖼️ Images
  if (!form.images || form.images.length === 0) {
    errors.images = "Please upload at least one image";
  }

  // 📝 Description
  if (!form.description?.trim()) {
    errors.description = "Description is required";
  } else if (form.description.length < 20) {
    errors.description = "Description must be at least 20 characters";
  } else if (form.description.length > 500) {
    errors.description = "Description cannot exceed 500 characters";
  }

  // 💱 Currency
  if (!form.currency?.trim()) {
    errors.currency = "Currency is required";
  } else if (!/^[A-Z]{3}$/.test(form.currency)) {
    errors.currency = "Currency must be a valid 3-letter code (e.g. INR, USD)";
  }

  // 💰 Rent Amount
  if (!form.rentAmount) {
    errors.rentAmount = "Rent amount is required";
  } else if (isNaN(Number(form.rentAmount))) {
    errors.rentAmount = "Rent amount must be numeric";
  } else if (Number(form.rentAmount) <= 0) {
    errors.rentAmount = "Rent amount must be greater than zero";
  } else if (Number(form.rentAmount) > 10000000) {
    errors.rentAmount = "Rent amount too high";
  }

  return errors;
};
