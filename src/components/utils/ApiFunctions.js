import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL + "/api/v1"
});

export async function addRoom(photo, roomType, roomPrice) {
  const formData = new FormData();
  formData.append("photo", photo.originFileObj);
  formData.append("roomType", roomType);
  formData.append("roomPrice", roomPrice);

  const response = await api.post("/rooms", formData, {
    headers: getHeader()
  });
  if (response.status === 200) {
    return true;
  }
  return false;
}

export async function getRoomTypes() {
  try {
    const response = await api.get("/rooms/room-types");
    return response.data;
  } catch (error) {
    throw new Error("Error fetching room types");
  }
}

export async function getAvailableRooms() {
  try {
    const response = await api.get("/rooms/available");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}


export async function verifyAccount(token) {
  try {
    const response = await api.get("/auth/verify/account", {
      params: {
        token
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getVerifyStatus(email) {
    try {
      const response = await api.get(`/auth/verify/${email}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
}

export async function addReview(values) {
  try {
    const response = await api.post("/testimonials", values, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getAllApprovedReviews() {
  try {
    const response = await api.get("/testimonials/approved");
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function approveReview(id) {
  try {
    const response = await api.patch(`/testimonials/${id}/approve`,{}, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function rejectReview(id) {
  try {
    const response = await api.delete(`/testimonials/${id}`, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getAllReviews() {
  try {
    const response = await api.get("/testimonials", {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getAllRooms(page, size, criteria) {
  try {
    const params = {
      page,
      size,
    };

    if (criteria.roomType) {
      params.roomType = criteria.roomType;
    }
    if (criteria.priceFrom) {
      params.minPrice = criteria.priceFrom;
    }
    if (criteria.priceTo) {
      params.maxPrice = criteria.priceTo;
    }
    if (criteria.dateRange) {
      const [checkInDate, checkOutDate] = criteria.dateRange;
      params.checkInDate = checkInDate.format("YYYY-MM-DD");
      params.checkOutDate = checkOutDate.format("YYYY-MM-DD");
    }

    const result = await api.get("/rooms", {params});
    return result.data;
  } catch (error) {
    throw new Error("Error fetching rooms")
  }
}

export async function deleteRoom(roomId) {
  try {
    const result = await api.delete(`/rooms/${roomId}`, {
      headers: getHeader()
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting room: ${error.response.data.message}`)
  }
}

export async function updateRoom(roomId, roomData) {
  const formData = new FormData()
  formData.append("roomType", roomData.roomType)
  formData.append("roomPrice", roomData.roomPrice)
  formData.append("photo", roomData.photo)

  const response = await api.put(`/rooms/${roomId}`, formData, {
    headers: getHeader()
  });
  return response.data;
}

export async function getRoomById(roomId) {
  try {
    const result = await api.get(`/rooms/${roomId}`)
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.response.data.message}`)
  }
}

export async function bookRoom(roomId, booking) {
  try {
    const payload = {
      ...booking,
      checkInDate: booking.checkInDate.format("YYYY-MM-DD"),
      checkOutDate: booking.checkOutDate.format("YYYY-MM-DD"),
    };
    const response = await api.post(`/bookings/rooms/${roomId}`, payload, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(`Error bookking room: ${error.message}`);
    }
  }
}

export async function cancelAllBookings() {
  try {
    const result = await api.delete(`/bookings`, {
      headers: getHeader()
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error cancel bookings: ${error.response.data.message}`);
  }
}

export async function getAllBookings(page, size) {
  try {
    const result = await api.get("/bookings", {
      params: {
        page: page,
        size: size
      },
      headers: getHeader()
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching bookings: ${error.message}`);
  }
}

export async function getBookingByConfirmationCode(confirmationCode) {
  try {
    const result = await api.get(`/bookings/confirmation/${confirmationCode}`, {
      headers: getHeader()
    })
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(`Error find booking : ${error.message}`)
    }
  }
}

export async function cancelBooking(bookingId) {
  try {
    const result = await api.delete(`/bookings/${bookingId}`, {
      headers: getHeader()
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error cancelling booking :${error.message}`)
  }
}

export async function registerUser(registration) {
  try {
    const response = await api.post("/auth/register", registration)
    return response.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error(`User registration error : ${error.message}`)
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/auth/login", login)
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null
    }
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getUserProfile(userId, token) {
  try {
    const response = await api.get(`/users/profile/${userId}`, {
      headers: getHeader()
    })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function deleteUser(userId) {
  try {
    const response = await api.delete(`/users/${userId}`, {
      headers: getHeader()
    })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getUser(userEmail) {
  try {
    const response = await api.get(`/users/${userEmail}`,)
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getUserById(userId) {
  try {
    const response = await api.get(`/users/${userId}`, {
      headers: getHeader()
    })
    return response.data
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getUserAvatar(imageUrl) {
  try {
    const response = await axios.get(imageUrl, {
      responseType: "blob"
    });
    const url = URL.createObjectURL(response.data);
    console.log(url);
    return url;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function uploadImage(userId, formData) {
  try {
    const response = await api.patch(`/users/${userId}/avatar`, formData, {
      headers: getHeader()
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function updateProfile(userEmail, userRequest) {
  try {
    const response = await api.put(`/users/${userEmail}`, userRequest, {
      headers: getHeader()
    })
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}

export async function getBookingsByUserId(userId, token) {
  try {
    const response = await api.get(`/bookings/users/${userId}`, {
      headers: getHeader()
    })
    return response.data
  } catch (error) {
    console.error("Error fetching bookings:", error.message)
    throw new Error("Failed to fetch bookings")
  }
}

export const getHeader = () => {
  const token = localStorage.getItem("token")
  return {
    Authorization: `Bearer ${token}`
  }
}