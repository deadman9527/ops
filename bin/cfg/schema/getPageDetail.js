cobra.add({
        "type":"object",
        "required":true,
        "properties":{
            "responseBody": {
                "type":"object",
                "required":true,
                "properties":{
                    "data": {
                        "type":"object",
                        "required":true,
                        "properties":{
                            "code": {
                                "type":"string",
                                "required":true
                            },
                            "end_month": {
                                "type":"string",
                                "required":true
                            },
                            "end_year": {
                                "type":"string",
                                "required":true
                            },
                            "start_month": {
                                "type":"string",
                                "required":true
                            },
                            "start_year": {
                                "type":"string",
                                "required":true
                            },
                            "sex": {
                                "type":"string",
                                "required":true
                            },
                            "type": {
                                "type":"string",
                                "required":true
                            },
                            "apply": {
                                "type":"string",
                                "required":true
                            }
                        }
                    },
                    "responseInfo": {
                        "type":"object",
                        "required":true,
                        "properties":{
                            "reasons": {
                                "type":"object",
                                "required":true,
                                "properties":{
                                    "code": {
                                        "type":"string",
                                        "required":true
                                    },
                                    "msg": {
                                        "type":"string",
                                        "required":true
                                    },
                                    "type": {
                                        "type":"number",
                                        "required":true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            "statusCode": {
                "type":"number",
                "required":true
            }
        }
    }
);
