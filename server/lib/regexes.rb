NAME_REGEX = /\A[A-Z]{1}[a-z]*\z/
SURNAME_REGEX = /\A[A-Z]{1}[a-z]*(?: [A-Z]{1}[a-z]*)*(?: [A-Z]{1}[a-z]*)?\z/
EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/
STRONG_PASSWORD_REGEX = /(?=^.{8,}$)(?=.*\d)(?=.*[!@#$%^&*]+)(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*\z/
