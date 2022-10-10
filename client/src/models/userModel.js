
export class User {
    constructor(
        id, 
        uid, 
        email,
        country_code,
        phone,
        name,
        profile_picture,
        user_type,
        is_approved,
        created_at,
        updated_at
        ) {
      this.id = id;
      this.uid = uid;
      this.email = email;
      this.country_code = country_code;
      this.phone = phone;
      this.name = name;
      this.profile_picture = profile_picture;
      this.user_type = user_type;
      this.is_approved = is_approved;
      this.created_at = created_at;
      this.updated_at = updated_at;
    }
  }