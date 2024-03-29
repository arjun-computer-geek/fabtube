import { Response } from "miragejs";
/**
 * All the routes related to Category are present here.
 * These are Publicly accessible routes.
 * */

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/categories
 * */

export const getAllCategoriesHandler = function () {
  try {
    return new Response(200, {}, { categories: this.db.categories });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};

/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/category/:categoryId
 * */

export const getCategoryHandler = function (schema, request) {
  const { categoryId } = request.params;
  try {
    const category = schema.categories.findBy({ _id: categoryId }).attrs;
    return new Response(200, {}, { category });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
/**
 * This handler handles gets all categories in the db.
 * send GET Request at /api/categories/:categoryName
 * */

export const getCategoriesVideoHandler = function (schema, request) {
  const {categoryName} = request.params;
  try {
    const videos = [...this.db.videos].filter(item => item.categoryName === categoryName)
    if(videos.length === 0){
      return new Response(
        404,
        {},
        {
          error: "internal server error",
        }
      );
    }
    return new Response(200, {}, { videos: videos });
  } catch (error) {
    return new Response(
      500,
      {},
      {
        error,
      }
    );
  }
};
