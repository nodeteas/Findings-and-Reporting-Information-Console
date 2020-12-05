import axios from 'axios';
import 'date-fns';
import React, { useState, useEffect, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
// import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';

import { DetailViewActionContext } from '../general/LayoutTemplate';
import { FindingContext } from '../findings/FindingContext';
import FindingForm from '../findings/FindingForm';
import Spinner from '../general/Spinner';
import styles from '../../css/subtasks/SubtaskDetailView.module.css';

export default function FindingDetailView(props) {
    const closeDetailAction = useContext(DetailViewActionContext);
    const [contentIsLoading, setContentIsLoading] = useState(true);
	const [id, setID] = useState('');
    const [hostName, setHostName] = useState('');
    const [ipPort, setIpPort] = useState('');
    const [description, setDescription] = useState('');
    const [longDescription, setLongDescription] = useState('');
    const [status, setStatus] = useState('');
    const [type, setType] = useState('');
    const [classification, setClassification] = useState('');
    const [evidence, setEvidence] = useState('');
    const [system, setSystem] = useState('');
    const [task, setTask] = useState('');
    const [subtask, setSubTask] = useState('');
    const [relatedFindings, setRelatedFindings] = useState([]);
    const [confidentiality, setConfidentiality] = useState('');
    const [integrity, setIntegrity] = useState('');
    const [availability, setAvailability] = useState('');
    const [analyst, setAnalyst] = useState([]);
    const [collaborators, setCollaborators] = useState([]);
    const [posture, setPosture] = useState(''); //Not in classes
    const [mBriefDescription, setMBriefDescription] = useState('');
    const [mLongDescription, setMLongDescription] = useState('');
    const [relevance, setRelevance] = useState(''); //Not in classes
    const [effectiveRating, setEffectiveRating] = useState(0); //Not in classes
    const [impactDescription, setImpactDescription] = useState('');
	const [impactLevel, setImpactLevel] = useState('');
	const [sevCatCode, setSevCatCode] = useState('');
    const [sevCatScore, setSevCatScore] = useState('');
    const [vulSeverity, setVulSeverity] = useState('');
    const [qVs, setQVS] = useState('');
    const [risk, setRisk] = useState('');
    const [likelihood, setLikelihood] = useState('');
	const findingProviderValue = useMemo(() => ({
		id, setID,
		hostName, setHostName,
		ipPort, setIpPort,
		description, setDescription,
		longDescription, setLongDescription,
        status, setStatus,
        type, setType,
		classification, setClassification,
		evidence, setEvidence,
		system, setSystem, 
        task, setTask,
        subtask, setSubTask,
        relatedFindings, setRelatedFindings,
        confidentiality, setConfidentiality,
        integrity, setIntegrity,
        availability, setAvailability,
        analyst, setAnalyst,
        collaborators, setCollaborators,
        posture, setPosture, //Not in classes
        mBriefDescription, setMBriefDescription,
        mLongDescription, setMLongDescription,
        relevance, setRelevance, //Not in classes
		effectiveRating, setEffectiveRating, //Not in classes
        impactDescription, setImpactDescription,
		impactLevel, setImpactLevel,
		sevCatCode, setSevCatCode,
        sevCatScore, setSevCatScore,
        vulSeverity, setVulSeverity,
        qVs,  setQVS,
        risk, setRisk,
        likelihood, setLikelihood
    }), [id, hostName, ipPort, description, longDescription,
        status, type, classification, evidence, system, 
        task, subtask, relatedFindings, confidentiality, integrity, 
        availability, analyst, collaborators, posture, mBriefDescription,
        mLongDescription, relevance, effectiveRating, impactDescription,impactLevel,
        sevCatCode, sevCatScore, vulSeverity, qVs, risk, likelihood]);

	const handleSaveClick = () => {
		axios.put('http://localhost:5000/findings/update', {
			params: {
				id: (props.selectedFinding != null && props.selectedFinding.length === 1) ? props.selectedFinding[0] : '',
				hostName: hostName,
				ipPort: ipPort,
				description: description, 
				longDescription: longDescription,
				status: status,
				type: type,
				classification: classification, 
				evidence: evidence,
				system: system,
				task: task,
				subtask: subtask,
				relatedFindings: relatedFindings,
				confidentiality: confidentiality,
				integrity: integrity,
				availability: availability,
				analyst: analyst,
				collaborators: collaborators, 
				posture: posture, 
				mBriefDescription: mBriefDescription,
				mLongDescription: mLongDescription,
				relevance: relevance, 
				effectiveRating: effectiveRating, 
				impactDescription: impactDescription,
				impactLevel: impactLevel,
				sevCatCode: sevCatCode,
			}
		})
			.then(res => {
				console.log(res);
				props.reload();
				closeDetailAction();
				setContentIsLoading(true);
			})
			.catch(err => {
				console.log(err);
				//TODO: display error message
			})
        closeDetailAction(); // Close detail view tray
        
    }

	useEffect(() => {
		console.log(props.selectedFinding);
		setContentIsLoading(true);

		axios.get('http://localhost:5000/findings', {
			params: {
				_id: (props.selectedFinding != null && props.selectedFinding.length === 1) ? props.selectedFinding[0] : ''
			}
		})
			.then(res => {
				console.log(res.data);
				//TODO: validate request data before setting values
				if (res.data.length !== 1) throw new Error('Invalid number of findings.');
				const finding = res.data[0];
				setID(finding._id);
				setHostName(finding.hostName);
				setIpPort(finding.ipPort);
				setDescription(finding.description);
				setLongDescription(finding.longDescription);
				setStatus(finding.status);
				setType(finding.type);
				setClassification(finding.classification);
				setEvidence(finding.evidence);
				setSystem(finding.system);
				setTask(finding.task);
				setSubTask(finding.subtask);
				setRelatedFindings(finding.relatedFindings);
				setConfidentiality(finding.confidentiality);
				setIntegrity(finding.integrity);
				setAvailability(finding.availability);
				setAnalyst(finding.analyst);
				setCollaborators(finding.collaborators);
				setPosture(finding.posture);
				setMBriefDescription(finding.mBriefDescription);
				setMLongDescription(finding.mLongDescription);
				setRelevance(finding.relevance); 
				setEffectiveRating(finding.effectiveRating); 
				setImpactDescription(finding.impactDescription);
				setImpactLevel(finding.impactLevel);
				setSevCatCode(finding.sevCatCode);
				setSevCatScore(finding.sevCatScore);
				setVulSeverity(finding.vulSeverity);
				setQVS(finding.qVs);
				setRisk(finding.risk);
				setLikelihood(finding.likelihood)
				setContentIsLoading(false); // Show spinner
			})
			.catch(err => {
				console.log(err);
				//TODO: display error message
				setContentIsLoading(false);
			})
	}, [props.selectedFinding]); 

	return (
		(contentIsLoading) ? <Spinner /> : (
			<div className={styles.container}>
				<div style={{ textAlign: "center"}}>
					<h4 style={{ display: "inline-block", padding: "0.3em"}}>Finding Detail View</h4>
					<HelpOutlineRoundedIcon size="large" style={{verticalAlign: "baseline"}}/>
				</div>
				
				<FindingContext.Provider value={findingProviderValue}>
					<FindingForm 
						systemArray={props.systemArray}
						taskArray={props.taskArray}
						subtaskArray={props.subtaskArray}
					/>
				</FindingContext.Provider>

				<div className={styles.actionButtonsContainer}>
					<Button
						className={styles.actionButtons}
						onClick={handleSaveClick}
						variant="contained"
						size="large"
						startIcon={<SaveIcon />}
						color="primary"
					>Save</Button>
					<Button
						className={styles.actionButtons}
						onClick={closeDetailAction}
						variant="contained"
						size="large"
						startIcon={<CancelIcon />}
						color="secondary"
					>Cancel</Button>
				</div>
			</div>
		)
	);
}

FindingDetailView.propTypes = {
	selectedFinding: PropTypes.array.isRequired,
	reload: PropTypes.func.isRequired,
	taskArray: PropTypes.array,
	subtaskArray: PropTypes.array,
	systemArray: PropTypes.array,
}
