// Class representing a User in the system
class User {
    /**
     * Constructor for creating a new User
     * @param {string} name - The user's full name
     * @param {string} email - The user's email address
     * @param {string} password - The user's password (will be hashed)
     */
    constructor(name, email, password) {
        // Using this keyword to refer to the current instance of the class
        this.name = name;
        this.email = email;
        this.password = password;
        this.createdAt = new Date();
    }

    /**
     * Method to validate user data
     * @returns {boolean} - Returns true if data is valid, false otherwise
     */
    isValid() {
        return (
            this.name && this.name.length >= 3 &&
            this.email && this.email.includes('@') &&
            this.password && this.password.length >= 6
        );
    }

    /**
     * Method to convert user data to a format suitable for database storage
     * @returns {Object} - User data object
     */
    toDocument() {
        return {
            name: this.name,
            email: this.email,
            password: this.password, // In a real app, this should be hashed
            createdAt: this.createdAt
        };
    }

    /**
     * Static method to create a User instance from database data
     * @param {Object} data - User data from database
     * @returns {User} - New User instance
     */
    static fromDocument(data) {
        const user = new User(data.name, data.email, data.password);
        user.createdAt = data.createdAt;
        return user;
    }
}

export default User;