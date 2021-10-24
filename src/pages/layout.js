export const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};
export const tailFormItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 24},
        md:{span:24}
    },
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 8,
        },
    },
};

export const email_rules= [
        {
            type: 'email',
            message: 'هذا البريد غير صالح ',
        },
        {
            required: true,
            message: 'من فضلك أدخل بريدك الالكتروني',
        },
        ]


export const password_rules= [
                {
                    required: true,
                    message: 'من فضلك ادخل كلمة مرور',
                },
    () => ({
        validator(_, value) {
            if(value.length>6){
                    return Promise.resolve();
            }else{
                 return Promise.reject(
                            new Error("كلمة مرور قصيره")
                        );
            }
        },
    }),
        ]

        export const confirm_password_rules= 
                [
                {
                    required: true,
                        message: "من فضلك قم بتأكيد كلمة المرور",
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error("كلمة مرور غير متطابقه")
                        );
                    },
                }),
            ]