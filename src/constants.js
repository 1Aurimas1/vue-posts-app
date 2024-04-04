export const NotificationTypes = Object.freeze({ Success: 1, Error: 2 });

export const AuthorRules = {
  name: "required|between:3,30|non_numeric|fullname",
};

export const PostRules = {
  title: "required|between:5,20",
  authorId: "required",
  body: "required|between:15,300",
};
