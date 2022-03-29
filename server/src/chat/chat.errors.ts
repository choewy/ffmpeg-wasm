interface CustomError {
    seqError: Error,
    loadError: Error,
    saveError: Error,

};

export const ChatErrors: CustomError = {
    seqError: Error("_id를 생성하는데 실패하였습니다."),
    loadError: Error("대화내용을 불러오는데 실패하였습니다."),
    saveError: Error("대화내용을 저장하는데 실패하였습니다.")
};