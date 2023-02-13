import { filesize } from 'filesize';
import { uniqueId } from 'lodash';
import { useEffect, useState } from 'react';

import { UploadedFile } from '../../components/FileList/FileList';
import { Header } from '../../components/Header/Header';
import { Input } from '../../components/Input/Input';
import { MultiSelect } from '../../components/MultiSelect/MultiSelect';
import { NewAppPageFooterButtons } from '../../components/NewAppPageFooterButtons/NewAppPageFooterButtons';
import { Section } from '../../components/Section/Section';
import { UploadLogo } from '../../components/UploadLogo/UploadLogo';
import { useAppContext } from '../../manage-app-state/AppManageState';
import { TYPES } from '../../manage-app-state/actionTypes';
import './DefineAppProfilePage.scss';

interface DefineAppProfilePageProps {
	onClickBack: () => void;
	onClickContinue: () => void;
}

const CategoriesItems = [
	{
		label: 'Experience Management',
		value: 'Experience Management',
		checked: false,
	},
	{
		label: 'Collaboration and Knowledge Sharing',
		value: 'Collaboration and Knowledge Sharing',
		checked: false,
	},
];

const TagsItems = [
	{
		label: 'Analytics',
		value: 'Analytics',
		checked: false,
	},
	{
		label: 'Database',
		value: 'Database',
		checked: false,
	},
	{
		label: 'Data Visualization',
		value: 'Data Visualization',
		checked: false,
	},
	{
		label: 'Performance Management',
		value: 'Performance Management',
		checked: false,
	},
];

const headers = new Headers({
	Accept: "application/json",
	Authorization: "Basic " + btoa("test@liferay.com:test"),
	"Content-Type": "application/json",
  });

export function DefineAppProfilePage({
	onClickBack,
	onClickContinue,
}: DefineAppProfilePageProps) {
	const [{ appCategories, appDescription, appLogo, appName }, dispatch] = useAppContext();
	const [tags, setTags] = useState([]);
	const [categories, setCategories] = useState();

	const processUpload = (uploadedFile: UploadedFile) => {
		const data = new FormData();

		data.append('file', uploadedFile.file, uploadedFile.fileName);

		// api.post().then().catch()...
	};

	useEffect(()=> {
		const categories = fetch(
			``,
			{
			  body: JSON.stringify({
				siteId: ''
			  }),
			  headers,
			  method: "POST",
			}
		  );

		//   setCategories();
	}, [])

	const handleUpload = (files: FileList) => {
		const file = files[0];

		const newUploadedFile: UploadedFile = {
			error: false,
			file,
			fileName: file.name,
			id: uniqueId(),
			preview: URL.createObjectURL(file),
			progress: 0,
			readableSize: filesize(file.size),
			uploaded: true,
		};

		dispatch({
			payload: {
				file: newUploadedFile,
			},
			type: TYPES.UPDATE_APP_LOGO,
		});
		processUpload(newUploadedFile);

		// await api.post();
	};
	const handleDelete = (id: string) => {
		// await api.delete()

		dispatch({
			payload: {
				file: undefined,
			},
			type: TYPES.UPDATE_APP_LOGO,
		});
	};

	return (
		<div className='profile-page-container'>
			<Header
				title='Define the app profile'
				description='Enter your new app details. 
                                This information will be used for submission, 
                                presentation, customer support, and search capabilities.'
			/>
			<div className='profile-page-body-container'>
				<Section
					label='App Info'
					tooltip='More Info'
					tooltipText='More info'
				>
					<UploadLogo
						uploadedFile={appLogo}
						onUpload={handleUpload}
						onDeleteFile={handleDelete}
					/>

					<div>
						<Input
							component='input'
							label='Name'
							onChange={({ target }) =>
								dispatch({
									payload: {
										value: target.value,
									},
									type: TYPES.UPDATE_APP_NAME,
								})
							}
							placeholder='Enter app name'
							required
							tooltip='Name'
							value={appName}
						/>

						<Input
							component='textarea'
							placeholder='Enter app description'
							label='Description'
							localized
							onChange={({ target }) =>
								dispatch({
									payload: {
										value: target.value,
									},
									type: TYPES.UPDATE_APP_DESCRIPTION,
								})
							}
							required
							tooltip='Description'
							value={appDescription}
						/>

						<MultiSelect
							label='Categories'
							required
							tooltip='Categories'
							items={CategoriesItems}
							onChange={(value) =>
							dispatch({
								payload: {
									value
								},
								type: TYPES.UPDATE_APP_CATEGORIES,
							})}
							placeholder='Select categories'
						/>

						<MultiSelect
							label='Tags'
							required
							tooltip='Tags'
							items={TagsItems}
							onChange={() => setTags}
							placeholder='Select tags'
						/>
					</div>
				</Section>
			</div>

			<NewAppPageFooterButtons
				showBackButton
				onClickBack={() => onClickBack()}
				onClickContinue={() => {
					dispatch({
						payload: {
							appName,
							appDescription,
							appLogo,
							appCategories,
							tags
						},
						type: TYPES.SUBMIT_APP_PROFILE,
					});

					onClickContinue();
				}}
			/>
		</div>
	);
}
