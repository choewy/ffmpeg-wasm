interface CustomError {
    seqError: Error,
    loadError: Error,
    saveError: Error,
    duplicateError: Error,
    notFoundError: Error,
    passwordError: Error,
    tokenError: Error

};

export const UserErrors: CustomError = {
    seqError: Error("_id를 생성하는데 실패하였습니다."),
    loadError: Error("사용자 정보를 불러오는데 실패하였습니다."),
    saveError: Error("사용자 정보를 저장하는데 실패하였습니다."),
    duplicateError: Error("이미 존재하는 이메일입니다."),
    notFoundError: Error("존재하지 않는 이메일입니다."),
    passwordError: Error("비밀번호가 일치하지 않습니다."),
    tokenError: Error("인증에 실패하였습니다.")
};