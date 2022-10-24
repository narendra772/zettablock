import React from 'react'
import { useState, useEffect } from 'react';
import { getApisList, getSortedApisList, getSearchedApisList, deleteById } from '../services';
import "../styles/Table.css"
import {ReactComponent as Pencil} from '../assets/pencil-edit.svg'
import {ReactComponent as DetailIcon} from '../assets/details-icon.svg'
import {ReactComponent as TrashIcon} from '../assets/trash-icon.svg'
import Modal from './Modal'
import EditModal from './EditModal';
import {ReactComponent as SortIcon} from '../assets/sort-icon.svg'
import '../styles/SortIcon.css'

export default function Table() {
    const [showModal, updateShowModal] = useState(false);
    const toggleModal = () => updateShowModal(state => !state);

    const [showModal2, updateShowModal2] = useState(false);
    const toggleModal2 = () => updateShowModal2(state => !state);

    const [ fname, setName ] = useState("");
    const [ fcreatedAt, setCreatedAt ] = useState("");
    const [ fupdatedAt, setUpdatedAt ] = useState("");
    const [ fdescription, setDescription ] = useState("");
    const [ ftype, setType ] = useState("");
    const [ fid, setId ] = useState("");
    const [ foperationName, setOperationName ] = useState("");
    const [ fvariables, setVariables ] = useState("");
    const [ fquery, setQuery ] = useState("");
    const [ edescription, seteDescription ] = useState("");
    const [ eid, seteId ] = useState("");
    const [ sorted, setSorted ] = useState(false);
    const [ deleted, setDeleted ] = useState(false);

    const onSortHandler = async () => {
        setSorted(!sorted);
    }

    const onChangeHandler = async (e) => {
        const response = await getSearchedApisList(e.target.value);
        if (response) {
            SetApiList(response)
        }
    }
    const onEditHandler = (apiDetails) => (e) => {
        e.preventDefault();
        toggleModal2();
        seteId(apiDetails.id);
        seteDescription(apiDetails.description);
    }
    const onDetailsHandler = (apiDetails) => (event) => {
        event.preventDefault();
        toggleModal();
        setName(apiDetails.name)
        setCreatedAt(apiDetails.createdAt)
        setUpdatedAt(apiDetails.updatedAt)
        setDescription(apiDetails.description)
        setType(apiDetails.type)
        setId(apiDetails.id)
        setOperationName(apiDetails.operationName)
        setVariables(JSON.stringify(apiDetails.variables))
        setQuery(apiDetails.query)
    }
    const [ApiList, SetApiList] = useState()
    const fetchData = async () => {
        if(sorted) {
            const response = await getSortedApisList();
            if (response) {
                SetApiList(response)
            }
        } else {
        const response = await getApisList();
        if (response) {
            SetApiList(response)
        }
    }
    };
    useEffect(()=> {
        fetchData();
    },[])

    const onDeleteHandler = (api) => (e) => {
        e.preventDefault();
        deleteById(api.id);
        setDeleted(true);
        window.location.reload();
    }
    useEffect(() => {
        fetchData();
    }, [deleted, sorted])

  return (
    <>
    <div>
        <button onClick={onSortHandler} className='sort-button'>
            <SortIcon className='sort-icon'/>
            Sort
        </button>
        <input className='search-bar' onChange={onChangeHandler} type="text" placeholder="search..." />
        <br/> <br/>
    </div>
    <table>
        <thead>
            <tr>
                <th> API ID </th>
                <th> API Name </th>
                <th> Created At </th>
                <th> Updated At</th>
                <th> Description </th>
                <th> Type </th>
                <th> Operation Name </th>
            </tr>
        </thead>
        {
            ApiList && (ApiList.map((api) => {
                return(
                <tbody>
                    <tr>
                    <td> {api.id} </td>
                    <td> {api.name} </td>
                    <td> {api.createdAt} </td>
                    <td> {api.updatedAt} </td>
                    <td> {api.description} <button onClick={onEditHandler(api)} className='pencil-button'> edit <Pencil className='pencil-edit' /> </button></td>
                    <td> {api.type} </td>
                    <td> {api.operationName} </td>
                    <td className='details'> <button className='details-button' onClick={ onDetailsHandler(api) }> Show Details  <DetailIcon className='details-icon'/> </button> </td>
                    <td className='delete'> <button className='delete-button' onClick={ onDeleteHandler(api) }> Delete <TrashIcon className='trash-icon'/> </button> </td>
                    </tr>
                    <Modal canShow={showModal} updateModalState={toggleModal} name={fname} createdAt={fcreatedAt} updatedAt= {fupdatedAt} description= {fdescription} type= {ftype} id= {fid} operationName= {foperationName} variables= {fvariables} query= {fquery}/>
                    <EditModal canShow={showModal2} updateModalState={toggleModal2} id={eid} description={edescription} />
                </tbody>
                )
            }))
        }

    </table>
    </>
  )
}
