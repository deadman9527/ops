cobra.add({
        "type":"object",
        "required":true,
        "properties":{
            "responseBody": {
                "type":"object",
                "required":true,
                "properties":{
                    "data": {
                        "type":"array",
                        "required":false,
                        "items":
                        {
                            "type":"object",
                            "required":false,
                            "properties":{
                                "height": {
                                    "type":"string",
                                    "required":false
                                },
                                "id": {
                                    "type":"string",
                                    "required":false
                                },
                                "name": {
                                    "type":"string",
                                    "required":false
                                },
                                "width": {
                                    "type":"string",
                                    "required":false
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
