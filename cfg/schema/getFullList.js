cobra.add({
        "type":"object",
        "required":true,
        "properties":{
            "responseBody": {
                "type":"object",
                "required":false,
                "properties":{
                    "data": {
                        "type":"object",
                        "required":false,
                        "properties":{
                            "age": {
                                "type":"array",
                                "required":false,
                                "items":
                                {
                                    "type":"object",
                                    "required":false,
                                    "properties":{
                                        "id": {
                                            "type":"string",
                                            "required":false
                                        },
                                        "type": {
                                            "type":"string",
                                            "required":false
                                        }
                                    }
                                }


                            },
                            "user": {
                                "type":"array",
                                "required":false,
                                "items":
                                {
                                    "type":"object",
                                    "required":false,
                                    "properties":{
                                        "id": {
                                            "type":"string",
                                            "required":false
                                        },
                                        "type": {
                                            "type":"string",
                                            "required":false
                                        }
                                    }
                                }


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
