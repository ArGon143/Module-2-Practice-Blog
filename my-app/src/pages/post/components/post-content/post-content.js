import styled from 'styled-components';
import { H2, Icon } from '../../../../components';
import { SpecialPanel } from '../special-panel/special-panel';
import { useNavigate } from 'react-router-dom';

const PostContentConteiner = ({
	className,
	post: { id, title, imageUrl, content, publishedAt },
}) => {
	const navigate = useNavigate();

	return (
		<div className={className}>
			<img src={imageUrl} alt={title} />
			<H2>{title}</H2>
			<SpecialPanel
				publishedAt={publishedAt}
				margin="-20px 0 20px"
				editButton={
					<Icon
						id="fa-pencil-square-o"
						size="22px"
						margin="0 10px 0 0"
						onClick={() => navigate(`/post/${id}/edit`)}
					/>
				}
			/>
			<div className="post-text">{content}</div>
		</div>
	);
};

export const PostContent = styled(PostContentConteiner)`
	& img {
		float: left;
		margin: 0 20px 5px 0;
	}

	& .post-text {
		white-space: pre-line;
		font-size: 18px;
	}
`;
