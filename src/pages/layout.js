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
            message: 'The input is not valid E-mail!',
        },
        {
            required: true,
            message: 'Please input your E-mail!',
        },
        ]


export const password_rules= [
                {
                    required: true,
                    message: 'Please input your password!',
                },
    ({ getFieldValue }) => ({
        validator(_, value) {
            if(value.length>6){
                    return Promise.resolve();
            }else{
                 return Promise.reject(
                            new Error("too Short ")
                        );
            }
        },
    }),
        ]

        export const confirm_password_rules= 
                [
                {
                    required: true,
                    message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                            return Promise.resolve();
                        }
                        return Promise.reject(
                            new Error("The two passwords that you entered do not match!")
                        );
                    },
                }),
            ]