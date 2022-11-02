export const usePay = () => {
  function payment(data) {
    IMP.init("imp76177137");
    console.log("여기1");
    // IMP.request_pay(param, callback) 결제창 호출
    IMP.request_pay(
      {
        // param
        pg: "kakaopay.TC0ONETIME", //선결제는 : TC0ONETIME, 후결제,보증금결제는 :TCSUBSCRIP
        pay_method: "card", // 기능 없음.
        merchant_uid: "${merchant_uid}", // 상점에서 관리하는 주문 번호
        name: "최초인증결제",
        amount: 200, // 빌링키 발급과 함께 40원 결제승인을 시도합니다. price의 20%만 계산해서 넣는다. //후결제인 경우, 0으로 넣는다.
        customer_uid: "1", // 필수 입력
        buyer_email: "iamport@siot.do",
        buyer_name: "아임포트",
        buyer_tel: "02-1234-1234",
      },
      function (rsp) {
        // callback
        if (rsp.success) {
          console.log(rsp);
          // jQuery로 HTTP 요청
          jQuery
            .ajax({
              url: "http://localhost:8090/spaceZBE/reserve/insert",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              data: JSON.stringify({
                imp_uid: rsp.imp_uid,
                prepay_uid: rsp.merchant_uid,
                memberId: 1,
                companyId: 1,
                payStatus: "1",
                price: 200, //총 결제 금액
                prepay: "000", //000 : 선결제,001 : 보증금결제,002: 후결제
                spaceId: 1, // 사무공간 번호
                startDate: "2022-11-02 14:00", // 공간 대여 시작날짜 시간
                endDate: "2022-11-02 16:00", // 공간 대여 끝 날짜 시간
              }),
            })
            .done(function (data, textStatus, xhr) {
              console.log(xhr);
              if (xhr.responseText == "1") {
                alert("success!");
              } else {
                console.log(xhr.responseText);
                alert("에러발생[" + data.result_cd + "]");
              }
            });
        } else {
          alert(
            "실패: 코드(" + rsp.error_code + ") /메세지(" + rsp.error_msg + ")"
          );
        }
      }
    );
  }

  function cancelPay() {
    jQuery.ajax({
      url: "http://localhost:8090/spaceZBE/refund", // 예: http://www.myservice.com/payments/cancel
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({
        merchant_uid: "imp_314911968246", // 예: ORD20180131-0000011
        cancel_request_amount: 10, // 환불금액
        reason: "테스트 결제 환불", // 환불사유
        refund_holder: "홍길동", // [가상계좌 환불시 필수입력] 환불 수령계좌 예금주
        refund_bank: "88", // [가상계좌 환불시 필수입력] 환불 수령계좌 은행코드(예: KG이니시스의 경우 신한은행은 88번)
        refund_account: "56211105948400", // [가상계좌 환불시 필수입력] 환불 수령계좌 번호
      }),
      dataType: "json",
    });
  }

  return {
    cancelPay,
    payment,
  };
};
