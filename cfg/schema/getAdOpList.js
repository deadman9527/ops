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
                        "required":true,
                        "items":
                        {
                            "type":"object",
                            "required":true,
                            "properties":{
                                "ad_img": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_id": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_name": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_position_code": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_position": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_status_code": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_status": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_type_code": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_type": {
                                    "type":"string",
                                    "required":false
                                },
                                "ad_url": {
                                    "type":"string",
                                    "required":false
                                },
                                "age_stage": {
                                    "type":"array",
                                    "required":false

                                },
                                "end_time": {
                                    "type":"string",
                                    "required":false
                                },
                                "order_num": {
                                    "type":"string",
                                    "required":false
                                },
                                "remark": {
                                    "type":"string",
                                    "required":false
                                },
                                "start_time": {
                                    "type":"string",
                                    "required":false
                                },
                                "user_type": {
                                    "type":"array",
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
