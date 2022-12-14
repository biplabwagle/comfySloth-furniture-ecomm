import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions';

const filter_reducer = (state, action) => {
  try {
    switch (action.type) {
      case LOAD_PRODUCTS:
        let maxPrice = action.payload.map((p) => p.price);
        if (maxPrice[0]) {
          maxPrice = maxPrice.reduce((prevVal, currVal) =>
            prevVal > currVal ? prevVal : currVal
          );
        }
        return {
          ...state,
          all_products: [...action.payload],
          filtered_products: [...action.payload],
          filters: { ...state.filters, max_price: maxPrice, price: maxPrice },
        };
      case SET_GRIDVIEW:
        return {
          ...state,
          grid_view: true,
        };
      case SET_LISTVIEW:
        return {
          ...state,
          grid_view: false,
        };
      case UPDATE_SORT:
        return {
          ...state,
          sort: action.payload,
        };
      case SORT_PRODUCTS:
        const { sort, filtered_products } = state;
        let tempProducts = [...filtered_products];
        if (sort === 'price-lowest') {
          tempProducts = tempProducts.sort((a, b) => a.price - b.price);
        }
        if (sort === 'price-highest') {
          tempProducts = tempProducts.sort((a, b) => b.price - a.price);
        }
        if (sort === 'name-a') {
          tempProducts = tempProducts.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        }
        if (sort === 'name-z') {
          tempProducts = tempProducts.sort((a, b) =>
            b.name.localeCompare(a.name)
          );
        }
        return { ...state, filtered_products: tempProducts };
      case UPDATE_FILTERS:
        const { name, value } = action.payload;
        return { ...state, filters: { ...state.filters, [name]: value } };
      case FILTER_PRODUCTS:
        const { all_products } = state;
        const {
          textInput,
          category,
          color,
          company,
          shipping,
          price,
        } = state.filters;
        let temporaryProducts = [...all_products];

        //filtering based on scenarios
        //filtering based on textInput
        if (textInput) {
          temporaryProducts = temporaryProducts.filter((product) => {
            return product.name.toLowerCase().startsWith(textInput);
          });
        }
        //filtering based on category
        if (category !== 'all') {
          temporaryProducts = temporaryProducts.filter((product) => {
            return product.category === category;
          });
        }

        // filtering based on manufacturer
        if (company !== 'all') {
          temporaryProducts = temporaryProducts.filter(
            (product) => product.company === company
          );
        }
        //filtering based on color:
        if (color !== 'all') {
          temporaryProducts = temporaryProducts.filter((product) =>
            product.colors.includes(color)
          );
        }

        //filtering based on price
        if (price >= 0) {
          if (price === 0) {
            temporaryProducts = [];
          }
          temporaryProducts = temporaryProducts.filter((product) => {
            return product.price <= price;
          });
        }

        //filtering based on shipping
        if (shipping) {
          temporaryProducts = temporaryProducts.filter(
            (product) => product.shipping === true
          );
        }
        return { ...state, filtered_products: temporaryProducts };
      case CLEAR_FILTERS:
        return {
          ...state,
          filters: {
            ...state.filters,
            textInput: '',
            category: 'all',
            color: 'all',
            company: 'all',
            shipping: false,
            price: state.filters.max_price,
          },
        };
      default:
        return state;
    }
  } catch (error) {
    throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default filter_reducer;
