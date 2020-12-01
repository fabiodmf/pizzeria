export const actionTypes = {
  HYDRATE: "HYDRATE",

  CHANGE_CURRENCY: "CHANGE_CURRENCY",
  TOGGLE_DARK_MODE: "TOGGLE_DARK_MODE",

  ADD_TOAST: "ADD_TOAST",
  REMOVE_TOAST: "REMOVE_TOAST",

  LOGIN_REQUESTED: "LOGIN_REQUESTED",
  LOGIN_SUCCESSFUL: "LOGIN_SUCCESSFUL",
  LOGOUT_SUCCESSFUL: "LOGOUT_SUCCESSFUL",

  ADD_MULTIPLE_IN_CART: "ADD_MULTIPLE_IN_CART",
  REMOVE_MULTIPLE_FROM_CART: "REMOVE_MULTIPLE_FROM_CART",
  SET_QUANTITY_CART: "SET_QUANTITY_CART",

  LOAD_MENU: "LOAD_MENU"
};

export function changeCurrency(code) {
  return {
    type: actionTypes.CHANGE_CURRENCY,
    payload: {
      code,
      toast: {
        status: "info",
        title: "Currency changed!",
        description: `You are viewing the prices in ${code.toUpperCase()} now.`,
        isClosable: true,
        duration: 9000,
        position: "bottom-right"
      }
    }
  };
}

export function toggleNightMode() {
  return {
    type: actionTypes.TOGGLE_DARK_MODE
  };
}

export function addToast(toast) {
  return {
    type: actionTypes.ADD_TOAST,
    payload: {
      toast: {
        position: "bottom-right",
        duration: 9000,
        isClosable: true,
        ...toast
      }
    }
  };
}

export function removeToast(toastId = null) {
  return { type: actionTypes.REMOVE_TOAST, payload: { id: toastId } };
}

export function loginRequested() {
  return { type: actionTypes.LOGIN_REQUESTED };
}

export function loginSuccessful(user = null) {
  return {
    type: actionTypes.LOGIN_SUCCESSFUL,
    payload: {
      user,
      toast: {
        status: "success",
        title: "Logged in!",
        description: `Hello. You can now make orders.`,
        isClosable: true,
        duration: 9000,
        position: "bottom-right"
      }
    }
  };
}

export function addMultipleInCart(itemIds) {
  return {
    type: actionTypes.ADD_MULTIPLE_IN_CART,
    payload: {
      ids: itemIds,
      toast: {
        status: "success",
        title: "Added to cart!",
        description: `You have added ${itemIds.length} item${
          itemIds.length > 1 ? "s" : ""
        } to cart.`,
        isClosable: true,
        duration: 9000,
        position: "bottom-right"
      }
    }
  };
}

export function removeMultipleFromCart(ids = null) {
  return {
    type: actionTypes.REMOVE_MULTIPLE_FROM_CART,
    payload: {
      ids,
      toast: {
        status: "warning",
        title: "Removed from cart!",
        description: `You have removed ${ids ? ids.length : "all"} item${
          ids ? (ids.length > 1 ? "s" : "") : "s"
        } from cart.`,
        isClosable: true,
        duration: 9000,
        position: "bottom-right"
      }
    }
  };
}

export function setQuantityInCart(id, value) {
  return { type: actionTypes.SET_QUANTITY_CART, payload: { id, value } };
}

export function loadMenu(items = []) {
  return { type: actionTypes.LOAD_MENU, payload: { items } };
}
