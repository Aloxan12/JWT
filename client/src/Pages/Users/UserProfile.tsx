import React from 'react';
import {useParams} from "react-router-dom";
import {useGetUserDetailQuery} from "../../redux/api/usersApi";

export const UserProfile = () => {
    const {id} = useParams()
    const {data: user} = useGetUserDetailQuery({id: id!}, {skip: !id})

    return (
        <div>

        </div>
    );
};
